import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { chromium } from "playwright-core";

const root = process.cwd();
const artifactsDir = path.join(root, "artifacts");
const port = 3200;
const url = `http://127.0.0.1:${port}`;
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const expectedMailto =
  "mailto:ajmi.198599@gmail.com?subject=Landing%20Page%20Inquiry%20-%20Aurelian%20Coffee%20Atelier";

fs.mkdirSync(artifactsDir, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let index = 0; index < 80; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(400);
    }
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function stopServer() {
  if (!server.pid || server.exitCode !== null) return;

  server.kill();
  await Promise.race([once(server, "exit"), wait(2500)]);

  if (server.exitCode === null) {
    const child = spawn("taskkill.exe", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    child.unref();
  }

  server.stdout.destroy();
  server.stderr.destroy();
}

const env = { ...process.env };
delete env.PATH;

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let log = "";
server.stdout.on("data", (data) => {
  log += data.toString();
});
server.stderr.on("data", (data) => {
  log += data.toString();
});

try {
  await waitForServer();

  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
    args: ["--disable-gpu", "--mute-audio"],
  });
  const context = await browser.newContext({
    reducedMotion: "no-preference",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const consoleIssues = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleIssues.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleIssues.push(`pageerror: ${error.message}`);
  });

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-desktop-hero.png"), fullPage: false });

  await page.locator("button", { hasText: "Enter the Orbit" }).click();
  await wait(900);
  const enterOrbitScroll = await page.evaluate(() => Math.abs(document.getElementById("orbit").getBoundingClientRect().top));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("button", { hasText: "Reserve the Atelier" }).click();
  await wait(2400);
  const reserveScroll = await page.evaluate(() => Math.abs(document.getElementById("reserve").getBoundingClientRect().top));

  await page.locator("#orbit").scrollIntoViewIfNeeded();
  await wait(900);
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-desktop-orbit.png"), fullPage: false });

  await page.locator("#reserve").scrollIntoViewIfNeeded();
  await wait(700);
  await page.getByLabel("Name").fill("Portfolio Viewer");
  await page.getByRole("button", { name: /request a tasting/i }).click();
  await page.getByText("Request received — this is a concept demo.").waitFor({ timeout: 3000 });
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-desktop-contact.png"), fullPage: false });

  const desktopReport = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const offenders = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const htmlElement = element;
        const rect = htmlElement.getBoundingClientRect();
        return rect.width > 0 && htmlElement.scrollWidth - htmlElement.clientWidth > 2;
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: element.getAttribute("class") || "",
        text: (element.textContent || "").trim().slice(0, 80),
        delta: element.scrollWidth - element.clientWidth,
      }));

    return {
      overflow,
      offenders,
      videos: document.querySelectorAll("video").length,
      beans: document.querySelectorAll(".orbit-bean").length,
      links: Array.from(document.querySelectorAll("a[href]")).map((anchor) => ({
        text: (anchor.textContent || "").trim(),
        href: anchor.getAttribute("href"),
        target: anchor.getAttribute("target"),
      })),
      metadata: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
        ogType: document.querySelector('meta[property="og:type"]')?.getAttribute("content") || "",
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      },
      creatorVisible: document.body.textContent.includes("Created by Mohammed Ajmi"),
      emailVisible: document.body.textContent.includes("ajmi.198599@gmail.com"),
      successVisible: document.body.textContent.includes("Request received — this is a concept demo."),
    };
  });

  const forbiddenLinkTerms = ["pexels", "mixkit", "pixabay"];
  const allowedExternalOrigins = ["https://www.instagram.com/", "https://www.linkedin.com/", "https://github.com/"];
  const localAnchors = desktopReport.links.filter((link) => link.href?.startsWith("#"));
  const missingAnchorTargets = await page.evaluate((anchors) => {
    return anchors.filter((href) => !document.querySelector(href));
  }, localAnchors.map((link) => link.href));
  const unsafeLinks = desktopReport.links.filter((link) => {
    const href = link.href || "";
    const lower = href.toLowerCase();
    if (forbiddenLinkTerms.some((term) => lower.includes(term))) return true;
    if (href.startsWith("#") || href === expectedMailto) return false;
    if (allowedExternalOrigins.includes(href)) return false;
    return true;
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-mobile-hero.png"), fullPage: false });
  await page.locator("#orbit").scrollIntoViewIfNeeded();
  await wait(500);
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-mobile-orbit.png"), fullPage: false });

  await page.locator("#reserve").scrollIntoViewIfNeeded();
  await wait(500);
  await page.screenshot({ path: path.join(artifactsDir, "aurelian-mobile-contact.png"), fullPage: false });

  const mobileReport = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    mobileButtons: document.querySelectorAll(".mobile-orbit-button").length,
    contactButtons: Array.from(document.querySelectorAll("a[href]")).filter((anchor) =>
      anchor.getAttribute("href") === "mailto:ajmi.198599@gmail.com?subject=Landing%20Page%20Inquiry%20-%20Aurelian%20Coffee%20Atelier",
    ).length,
  }));

  await browser.close();

  const report = {
    url,
    interactionReport: {
      enterOrbitScroll,
      reserveScroll,
      expectedMailto,
      unsafeLinks,
      missingAnchorTargets,
    },
    desktopReport,
    mobileReport,
    consoleIssues,
    screenshots: [
      "artifacts/aurelian-desktop-hero.png",
      "artifacts/aurelian-desktop-orbit.png",
      "artifacts/aurelian-desktop-contact.png",
      "artifacts/aurelian-mobile-hero.png",
      "artifacts/aurelian-mobile-orbit.png",
      "artifacts/aurelian-mobile-contact.png",
    ],
  };

  fs.writeFileSync(path.join(artifactsDir, "visual-check.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await stopServer();
  fs.writeFileSync(path.join(artifactsDir, "next-dev.log"), log);
}


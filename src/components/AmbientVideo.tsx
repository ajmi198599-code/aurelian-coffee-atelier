"use client";

import { useEffect, useRef } from "react";

type AmbientVideoProps = {
  src: string;
  poster: string;
  className?: string;
  label?: string;
  eager?: boolean;
};

export function AmbientVideo({
  src,
  poster,
  className = "",
  label = "Cinematic coffee footage",
  eager = false,
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

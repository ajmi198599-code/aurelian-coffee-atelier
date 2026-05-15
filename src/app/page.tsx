import { HeroSection } from "@/components/HeroSection";
import { OrbitExperience } from "@/components/OrbitExperience";
import { StorySections } from "@/components/StorySections";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OrbitExperience />
      <StorySections />
    </main>
  );
}

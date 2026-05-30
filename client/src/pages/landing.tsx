import MainLayout from "../components/layouts/main-layout";
import { Counterdown } from "../components/sections/landing/counterdown";
import { CTA } from "../components/sections/landing/cta";
import { Features } from "../components/sections/landing/features";
import Hero from "../components/sections/landing/hero";
import { PricingPreview } from "../components/sections/landing/pricing";
import Stats from "../components/sections/landing/stats";

export default function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <Stats />
      <Features />
      <PricingPreview />
      <Counterdown />
      <CTA />
    </MainLayout>
  );
}

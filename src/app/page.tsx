import {
  Hero,
  ServicesOverview,
  Stats,
  PortfolioPreview,
  Testimonials,
  Process,
  CTA,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Stats />
      <Process />
      <PortfolioPreview />
      <Testimonials />
      <CTA />
    </>
  );
}

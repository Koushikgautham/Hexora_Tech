import {
  Hero,
  Services,
  Stats,
  Process,
  Projects,
  Team,
  Testimonials,
  Contact,
  GlobeExperiment,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Hero - Main intro and hook */}
      <Hero />
      
      {/* Services - What we do (detailed) */}
      <Services />
      
      {/* Stats - Credibility numbers */}
      <Stats />
      
      {/* Process - How we work */}
      <Process />
      
      {/* Projects - Our work with CardSwap animation */}
      <Projects />
      
      {/* Team - Who we are */}
      <Team />
      
      {/* Testimonials - Social proof */}
      <Testimonials />
      
      {/* Globe Experiment - 3D Interactive Globe */}
      <GlobeExperiment />
      
      {/* Contact - Get in touch */}
      <Contact />
    </>
  );
}

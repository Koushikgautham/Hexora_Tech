import Globe from "@/components/Globe";

export function GlobeExperiment() {
  return (
    <section id="globe-experiment" className="min-h-screen">
      <Globe
        title="Based in Chennai, India"
        subtitle="Serving clients worldwide"
        markerLat={13.08}
        markerLng={80.27}
        autoRotate={true}
      />
    </section>
  );
}

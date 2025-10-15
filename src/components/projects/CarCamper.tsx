export default function CarCamper() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        At the end of college I wanted to go on a road trip. I designed and with help from a range of friends built a camper into my Subaru Forester and went on a month long trip across the US.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">CarCamper</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const carCamperMetadata = {
  id: 6,
  title: "Car Camper",
  description: "Custom-built camper conversion for cross-country adventure",
  type: "gradient" as const,
  tags: ["Design", "Fabrication", "Adventure"],
  height: "h-[480px]",
  component: CarCamper
};


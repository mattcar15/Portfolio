export default function Sprout() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Sprout is a hydroponic system that allows users to grow plants without soil. With easy phone app control, it's a great way to grow plants at home.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">Sprout</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const sproutMetadata = {
  id: 4,
  title: "Sprout",
  description: "App-controlled hydroponic growing system",
  type: "gradient" as const,
  tags: ["React Native", "IoT", "Hardware"],
  height: "h-[420px]",
  component: Sprout
};


export default function MagSleeve() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Mag sleeve is a magnetic connection sleekly built into a computer sleeve for your laptop. It allows you to drop your laptop in the sleeve, to connect and then simply grab it and go. no more cables.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">MagSleeve</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const magSleeveMetadata = {
  id: 7,
  title: "MagSleeve",
  description: "Magnetic charging laptop sleeve - drop in, grab and go",
  type: "gradient" as const,
  tags: ["Product Design", "Hardware", "UX"],
  height: "h-[400px]",
  component: MagSleeve
};


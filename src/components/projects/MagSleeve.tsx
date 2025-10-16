export default function MagSleeve() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Mag sleeve is a magnetic connection sleekly built into a computer sleeve for your laptop. It allows you to drop your laptop in the sleeve, to connect and then simply grab it and go. no more cables.
      </p>
    </div>
  );
}

export const magSleeveMetadata = {
  id: 7,
  title: "Mag Sleeve",
  description: "Magnetic charging laptop sleeve - drop in, grab and go",
  type: "gradient" as const,
  tags: ["Product Design", "Hardware", "UX"],
  height: "h-[400px]",
  component: MagSleeve
};


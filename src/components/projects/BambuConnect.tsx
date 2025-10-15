export default function BambuConnect() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        BambuConnect is a platform that allows users to connect their Bambu printers to their computers and smartphones.
        It allows users to print 3D models, manage their prints, and view their print history.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">BambuConnect</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const bambuConnectMetadata = {
  id: 5,
  title: "BambuConnect",
  description: "Cross-platform 3D printer management and monitoring",
  type: "gradient" as const,
  tags: ["TypeScript", "3D Printing", "Mobile"],
  height: "h-[450px]",
  component: BambuConnect
};


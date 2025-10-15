export default function WDTTool() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        I designed and prodcued around 20 WDT Tools for stirring coffee. It was a project to learn how to scale 3D printing and learn the process of iterative physical design since I'd only ever truly iterated in software before!
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">WDT Tool</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const wdtToolMetadata = {
  id: 8,
  title: "WDT Tool",
  description: "3D-printed coffee distribution tool - learning to scale production",
  type: "gradient" as const,
  tags: ["3D Printing", "Manufacturing", "Coffee"],
  height: "h-[380px]",
  component: WDTTool
};


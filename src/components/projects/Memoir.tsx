export default function Memoir() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Memoir is a Mac app that runs in the background and turns everything you do on your computer into memories. It's an open source and local versioon of Microsoft's Recall.
      </p>
    </div>
  );
}

export const memoirMetadata = {
  id: 3,
  title: "Memoir",
  description: "Local-first memory capture app for Mac",
  type: "gradient" as const,
  tags: ["Swift", "Local-First", "Privacy"],
  height: "h-[380px]",
  component: Memoir
};


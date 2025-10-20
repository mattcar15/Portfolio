'use client';

export default function Memoir() {
  return (
    <div className="space-y-12">
      {/* WIP Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-amber-800">Work in Progress</span>
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Overview</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Memoir is a native Mac app that serves as an open-source take on Microsoft&apos;s Recall. It&apos;s designed to be a background service that provides a clean timeline UI for automatically collecting and aggregating memories of what you&apos;ve done on your computer.
          </p>
          
          <p>
            The goal is to build a local, deep context of what you&apos;re interested in and working on—capturing your digital activities in a privacy-respecting way that keeps all data on your machine.
          </p>
        </div>
      </div>

      {/* Current Progress Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Current Progress</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            I have a working MVP that I&apos;ve been using but right now the processing is too much to be running 24/7 when on battery. I also have the frontend UI MCP going and working, but need to transition the setup to a native app.
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Coming Soon</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Currently, I&apos;m refining the memory collection system to be lighter weight so that it can track more granular activities to build richer and more accurate memories. After this, I&apos;ll be refreshing the frontend to take advantage of the new system and then will be releasing the project!
          </p>

          <p>
            The long-term vision for Memoir is to connect it as an MCP (Model Context Protocol) server to the user&apos;s LLM. This will give AI assistants rich context about what you&apos;ve been working on, what you&apos;re interested in, and your workflows—all while maintaining ownership of your data.
          </p>
        </div>
      </div>
    </div>
  );
}

export const memoirMetadata = {
  id: 4,
  title: "Memoir App",
  description: "Open-source, local-first digital memory for Mac",
  type: "gradient" as const,
  tags: ["LLM", "MCP", "Local"],
  height: "h-[380px] md:h-[450px]",
  component: Memoir
};


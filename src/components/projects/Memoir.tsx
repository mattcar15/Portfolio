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
            Memoir is a native Mac app that serves as an open-source variant of Microsoft&apos;s Recall. It&apos;s designed to be a lightweight background service that provides a beautiful UI for automatically collected and aggregated memories of what you&apos;ve done on your computer.
          </p>
          
          <p>
            The goal is to build a local, deep context of what you&apos;re interested in and working on—capturing your digital activities in a privacy-respecting way that keeps all data on your machine.
          </p>
        </div>
      </div>

      {/* Technical Approach Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Technical Approach</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Native Performance.</strong> Built with Swift for macOS, Memoir runs efficiently in the background with minimal system overhead. It captures context without impacting your workflow or battery life.
          </p>
          
          <p>
            <strong>Privacy First.</strong> Unlike cloud-based solutions, all your data stays local on your machine. No telemetry, no external servers, no data leaving your control. Your memories are yours alone.
          </p>

          <p>
            <strong>Smart Aggregation.</strong> Rather than just taking screenshots, Memoir intelligently aggregates activity into meaningful memories—understanding what you were working on, what apps you used, and providing an intuitive way to search and navigate your digital history.
          </p>
        </div>
      </div>

      {/* Future Vision Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Future Vision</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            The long-term vision for Memoir is to connect it as an MCP (Model Context Protocol) server to the user&apos;s LLM. This would give AI assistants super-rich context about what you&apos;ve been working on, what you&apos;re interested in, and your workflows—all while maintaining complete privacy.
          </p>
          
          <p>
            Imagine an AI that truly understands your work patterns, can reference that project you worked on last month, or knows what documentation you were reading when solving a similar problem. That&apos;s the future Memoir is building toward—a local-first memory system that empowers your AI agents with context.
          </p>
        </div>
      </div>

      {/* Open Source Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Open Source</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Memoir is being built in the open. The code will be available on GitHub for anyone to audit, modify, or contribute to. For a tool that captures everything you do on your computer, transparency and trust are paramount.
          </p>
          
          <p>
            By making it open source, we ensure that the community can verify the privacy claims, suggest improvements, and adapt the tool to their specific needs. It&apos;s a tool for everyone who wants control over their digital memory.
          </p>
        </div>
      </div>
    </div>
  );
}

export const memoirMetadata = {
  id: 4,
  title: "Memoir",
  description: "Open-source, local-first digital memory for Mac",
  type: "gradient" as const,
  tags: ["LLM", "MCP", "Local"],
  height: "h-[380px] md:h-[450px]",
  component: Memoir
};


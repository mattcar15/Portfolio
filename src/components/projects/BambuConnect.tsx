export default function BambuConnect() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <a href="https://pepy.tech/projects/bambu-connect">
          <img
            src="https://static.pepy.tech/personalized-badge/bambu-connect?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads"
            alt="PyPI Downloads for bambu-connect"
          />
        </a>
        <a href="https://github.com/mattcar15/bambu-connect">
          <img
            src="https://img.shields.io/github/stars/mattcar15/bambu-connect?style=social"
            alt="GitHub Stars for mattcar15/bambu-connect"
          />
        </a>
      </div>

      <p className="leading-relaxed text-slate-700">
        BambuConnect started as my attempt to automate an Etsy print farm—full G-code control, automated job queuing, and no
        reliance on the Bambu cloud. Hours spent combing forums and poking at undocumented endpoints turned into a Python
        library that cleanly wraps the printer&apos;s LAN APIs so other makers can script the same local-first workflows.
      </p>

      <div className="space-y-3 leading-relaxed text-slate-600">
        <p className="font-medium text-slate-700">On GitHub you&apos;ll find:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-slate-800">Live telemetry</strong> covering chamber temperatures, progress, and printer alerts.
          </li>
          <li>
            <strong className="text-slate-800">LAN camera streaming</strong> for real-time monitoring without routing video through the cloud.
          </li>
          <li>
            <strong className="text-slate-800">Job control</strong> that sends queued prints or raw G-code commands straight from Python.
          </li>
          <li>
            <strong className="text-slate-800">Deep diagnostics</strong> with full printer stat dumps when you need to debug a run.
          </li>
          <li>
            <strong className="text-slate-800">Example automations</strong> demonstrating dashboards, notifications, and workflow hooks.
          </li>
        </ul>
      </div>

      <div className="space-y-2 leading-relaxed text-slate-600">
        <p className="font-medium text-slate-700">Getting set up is quick:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Install the package with <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-700">pip install bambu-connect</code>.
          </li>
          <li>
            Add your printer&apos;s IP address, access code, and serial number—easy to grab from the printer&apos;s WLAN settings.
          </li>
          <li>
            Run the scripts in <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-700">examples/</code> and tailor them to your automation goals.
          </li>
        </ol>
      </div>
    </div>
  );
}

export const bambuConnectMetadata = {
  id: 3,
  title: "bambu-connect",
  description: "Cross-platform 3D printer management and monitoring",
  type: "gradient" as const,
  tags: ["Python", "3D Printing", "Open Source"],
  height: "h-[380px] md:h-[400px]",
  component: BambuConnect
};

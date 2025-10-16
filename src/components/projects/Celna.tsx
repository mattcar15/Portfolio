'use client';

export default function Celna() {
  return (
    <div className="space-y-12">
      {/* Demo Video */}
      <div className="relative w-full aspect-video overflow-hidden rounded-3xl bg-slate-100">
        <video
          className="w-full h-full object-cover"
          controls
          preload="metadata"
        >
          <source src="/videos/Celna/celna_demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Overview</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Celna is the API and MCP hub for individuals and companies. Connect your internal and third-party tools once, set method-level permissions scoped by role and client, and then paste our MCP endpoint into any compatible client to give agents and teammates instant, least-privilege access.
          </p>
          
          <p>
            Administrators get real-time audit trails and usage analytics through our dashboard, so every call is traceable and auditable for corporate access controls.
          </p>

          <p>
            Because Celna acts as the control layer, we also enable LLM-native authentication. This allows agents to log into third-party services via SSO, even in browser-based environments. On the provider side, third-party sites can support agent-driven access simply by adding a new login method—no deep integration required.
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Current Progress</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            We have a working MVP in production that we use internally. Users can connect and authenticate MCP tools, apply method-level permissions scoped by role and client, and optionally require confirmation before tools execute.
          </p>
          
          <p>
            When an LLM tries to call a sensitive method, the user receives a notification and can approve or deny it. Currently, we&apos;re finishing the account and settings pages, building tool discovery to recommend connectors a user hasn&apos;t enabled but would find helpful, and rolling out managed third-party MCPs so teams don&apos;t have to self-host.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Vision</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            As AI agents become more sophisticated, the need for secure, auditable access control becomes critical. Celna solves this by providing a unified control layer that sits between AI agents and the tools they need to access.
          </p>
          
          <p>
            Rather than building custom integrations for every service, teams can use Celna to manage all their tool connections in one place, with fine-grained permissions and comprehensive audit trails—making it safe to let AI agents actually do their work.
          </p>
        </div>
      </div>
    </div>
  );
}

export const celnaMetadata = {
  id: 1,
  title: "Celna",
  description: "API and MCP hub with method-level permissions and audit trails",
  type: "gradient" as const,
  tags: ["FastAPI", "MCP", "Auth"],
  height: "h-[380px] md:h-[450px]",
  component: Celna
};


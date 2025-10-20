'use client';

export default function Celna() {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">Overview</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Celna is the API and MCP hub for individuals and companies. Connect your internal and third-party tools once, set method-level permissions scoped by role and client, and then paste our MCP endpoint into any compatible client to give agents and teammates instant, least-privilege access.
          </p>
          
          <p>
            Administrators get real-time audit trails and usage analytics through our dashboard, so every call is traceable and auditable for corporate access controls.
          </p>
        </div>
      </div>

      {/* Demo Video */}
      <div className="space-y-4">
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
        <p className="text-center text-sm text-slate-600 italic">Celna demo using Claude</p>
      </div>
      {/* Link section */}
      <div className="text-lg text-slate-700">
        You can check out the site here: <a href="https://celna.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-800 underline">celna.ai</a>
      </div>

      {/* Progress Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">Progress</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            We got the product working for a beta run and were rolling it out to some friends and family. As we were doing so OpenAI released agent builder and their app system. Even though these services aren&apos;t mature we don&apos;t think there&apos;s a good place for Celna in the market anymore. They included pipedream, a competitor, in the builder and app store on launch too which means that it&apos;s two tiers of competition that as two people we didn&apos;t think we could compete with.
          </p>
        </div>
      </div>

      {/* Technical Details Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">Technical Details</h3>
        <div className="text-lg text-slate-700 space-y-10 leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Platform Architecture</h4>
            <p>
              Celna runs as a collection of microservices anchored by a FastAPI MCP hub built on the mcp Python library. The hub is the interface that LLM clients connect to, and it brokers access to every third-party integration. It retrieves customer credentials from our database, applies role-scoped permissions, and completes the authenticated calls the agent requests through the dashboard approval flows.
            </p>
            <p>
              A companion backend service manages each third-party OAuth handshake and tracks the state of every MCP authorization sequence, so new connectors can plug in without touching the core runtime.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Infrastructure & Deployment</h4>
            <p>
              Jenkins pipelines ship every service into our EKS cluster with a fully automated path from commit to production. Hosted MCPs run as AWS Lambdas behind API Gateway, letting us scale to any number of connectors without paying for idle capacity.
            </p>
            <p>
              A reusable pipeline template standardizes build, test, and deploy steps so Jenkins can discover new MCPs automatically, package them, and publish the necessary CloudFormation stacks.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Autonomous Build System</h4>
            <p>
              We layered in templated prompts that ask GPT to research a target service, then feed the findings into a Cursor workflow tailored to our MCP abstraction. Because Celna manages credentials, the automation can run integration tests end-to-end before shipping a beta-ready build.
            </p>
            <p>
              The result was a repeatable pipeline that could generate a production-grade MCP in roughly 15 minutes with minimal human intervention.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">The Vision</h3>
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

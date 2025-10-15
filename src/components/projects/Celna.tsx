export default function Celna() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Okta-styled MCP service with auto-generation and testing capabilities, 
        enabling rapid integration development and deployment.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">Celna</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const celnaMetadata = {
  id: 1,
  title: "Celna",
  description: "Okta-styled MCP service with auto-generation and testing",
  type: "gradient" as const,
  tags: ["Kafka", "Redis", "Postgres"],
  height: "h-[500px]",
  component: Celna
};


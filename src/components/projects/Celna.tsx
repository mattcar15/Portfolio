export default function Celna() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        Okta-styled MCP service with auto-generation and testing capabilities, 
        enabling rapid integration development and deployment.
      </p>
    </div>
  );
}

export const celnaMetadata = {
  id: 1,
  title: "Celna",
  description: "Okta-styled MCP service with auto-generation and testing",
  type: "gradient" as const,
  tags: ["Kafka", "Redis", "Postgres"],
  height: "h-[380px] md:h-[450px]",
  component: Celna
};


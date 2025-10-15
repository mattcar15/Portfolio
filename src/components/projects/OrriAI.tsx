export default function OrriAI() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
        E2E encrypted AI agent platform with proprietary sync mechanism for secure, 
        distributed data management across devices.
      </p>

      <div className="text-sm text-slate-500">
        Interested in learning more about{' '}
        <strong className="font-semibold text-slate-700">Orri AI</strong>? Drop me
        a line using the contact section below.
      </div>
    </div>
  );
}

export const orriAIMetadata = {
  id: 2,
  title: "Orri AI",
  description: "E2E encrypted AI agent platform with proprietary sync mechanism",
  type: "gradient" as const,
  tags: ["FastAPI", "K8s", "E2E Encryption"],
  height: "h-[400px]",
  component: OrriAI
};


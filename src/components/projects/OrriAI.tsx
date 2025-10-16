'use client';

export default function OrriAI() {
  return (
    <div className="space-y-12">
      {/* Demo Videos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="relative w-full aspect-[9/16] overflow-hidden rounded-3xl bg-slate-100">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              <source src="/src/components/projects/assets/OrriAI/orri_ai_mobile_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-slate-600 italic">Mobile App Experience</p>
        </div>

        <div className="space-y-3">
          <div className="relative w-full aspect-video overflow-hidden rounded-3xl bg-slate-100">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              <source src="/src/components/projects/assets/OrriAI/orri_ai_web_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-slate-600 italic">Web Platform Experience</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">What is Orri?</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Orri is a personal AI agent platform that makes sense of all your digital context. We use visual widgets to go beyond the chat interface, blending all your apps with a single LLM interface.
          </p>
          
          <p>
            We leverage end-to-end encryption, like Signal, to safeguard personal context while still giving LLMs the information they need to take incredibly informed actions on your behalf. Your data stays yours, encrypted on your devices, yet accessible to AI when you need it.
          </p>
        </div>
      </div>

      {/* Journey Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Journey</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Original Vision.</strong> We originally built out the web version of Orri because we were building for business customers. For this, we built an end-to-end encrypted data management system that syncs across multiple devices and connected it to the first iteration of our web client.
          </p>
          
          <p>
            <strong>The Pivot.</strong> Through extensive user interviews, we realized businesses relied on complex niche tools, which poorly fit our value add of unifying a range of services. We pivoted from B2B to B2C, recognizing that personal use cases were a better fit for our technology.
          </p>

          <p>
            <strong>Finding the Wedge.</strong> We've done extensive user research and identified personal finance as the most promising place to begin. Orri's privacy-first, context-aware agents are uniquely equipped to create tailored financial plans, explain them clearly, and take actions to help enact them on behalf of users.
          </p>

          <p>
            <strong>Mobile First.</strong> With the pivot to consumer, we decided to build out the mobile app side, because the interface fits the consumer use case far better. We've finished our first version of the app and launched a closed beta with early users. We're continuing to add apps and fix issues as they come up, leveraging user feedback to inform feature development.
          </p>
        </div>
      </div>

      {/* The Why Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Why We Built This</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            We recognized the rapid advancements in LLMs and saw a clear gap. These powerful models could understand and generate language but lacked the ability to take meaningful action in a user's digital world.
          </p>
          
          <p>
            A platform enabling LLMs to securely interact with apps and automate complex tasks was inevitable—and we wanted to build it the right way. We've worked extensively with modern, scalable backend services and understand the benefits of cloud-based applications. This experience enables us to rethink typical web-app design, shifting key data controls back into the hands of the user.
          </p>

          <p>
            We felt the need ourselves. Juggling finances, tasks, and decisions across disconnected apps was messy and inefficient. When we shared the idea of a personal agent that could take action across tools, some saw the potential right away, while others were skeptical. That gap is our opportunity—and by bridging it, we believe we can build something truly impactful.
          </p>
        </div>
      </div>
    </div>
  );
}

export const orriAIMetadata = {
  id: 2,
  title: "Orri AI",
  description: "Privacy-first personal AI agent platform for your digital life",
  type: "gradient" as const,
  tags: ["React Native", "FastAPI", "E2E Encryption"],
  height: "h-[380px] md:h-[360px]",
  component: OrriAI
};


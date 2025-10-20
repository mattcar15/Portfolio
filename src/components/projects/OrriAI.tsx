'use client';

import Picture from "@/components/Picture";

export default function OrriAI() {
  return (
    <div className="space-y-12">
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

      {/* Mobile App Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Mobile App</h3>
        <div className="flex justify-center">
          <div className="space-y-3 max-w-md">
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-3xl bg-slate-100">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/videos/OrriAI/orri_ai_mobile_demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-sm text-slate-600 italic">Mobile App Experience</p>
          </div>
        </div>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            We pivoted to a consumer-focused, mobile-first approach after realizing personal use cases were a better fit for our technology than enterprise solutions. The mobile app is currently in closed beta, where we&apos;re actively adding app integrations and refining the experience based on user feedback.
          </p>
        </div>
      </div>

      {/* Journey Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Journey</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Original Vision:</strong> We initially built for business customers with an end-to-end encrypted data management system syncing across devices.
          </p>
          
          <p>
            <strong>The Pivot:</strong> User interviews revealed businesses relied on complex niche tools that didn&apos;t align with our value proposition of unifying services. We pivoted from B2B to B2C.
          </p>

          <p>
            <strong>Finding the Wedge:</strong> From talking to potential users, we identified personal finance as the ideal entry point—Orri&apos;s privacy-first, context-aware agents can create tailored financial plans and take action on users&apos; behalf.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Tech Stack</h3>
        
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            At the heart of Orri is a sophisticated backend architecture designed to handle the complex challenge of synchronizing encrypted data across multiple devices in real-time. The diagram below illustrates at high level how our microservices work together to enable secure, decentralized data management while maintaining consistency across all connected clients.
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 p-8">
          <Picture
            srcKey="OrriAI/architecture_diagram"
            alt="Orri AI Architecture Diagram"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="w-full h-auto"
          />
        </div>

        <div className="text-lg text-slate-700 space-y-10 leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Backend Services</h4>
            <p>
              Our backend leverages a microservices architecture to create a decentralized, end-to-end encrypted data management system. Two core services anchor the platform: a Request Manager built with FastAPI that handles client API requests and orchestrates data operations, and a Sync Manager that coordinates real-time multi-device state with conflict resolution.
            </p>
            <p>
              Apache Kafka queues and processes data asynchronously, while PostgreSQL stores customer and client metadata with relational integrity. Redis maintains in-memory state tracking which clients are active and holds processing locks. WebSockets enable bidirectional communication for real-time client-to-server and client-to-client messaging. Keycloak serves as our identity and access management provider with OAuth 2.0 and OIDC support.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Client-Side Architecture</h4>
            <p>
              The mobile clients are built with React Native for cross-platform iOS and Android development. Each device maintains a local SQLite database for offline-first data persistence, allowing users to work seamlessly even without connectivity.
            </p>
            <p>
              We implemented sophisticated socket management with connection pooling, automatic reconnection, and state recovery to handle unreliable network conditions. A custom key exchange protocol securely distributes cryptographic keys for end-to-end encryption. Multi-layer caching with LRU eviction policies keeps frequently accessed data readily available, while CRDT-inspired conflict resolution algorithms handle concurrent offline modifications when devices sync back up.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Infrastructure & DevOps</h4>
            <p>
              All services run in an Amazon EKS cluster, orchestrating our containerized microservices with Kubernetes. Each service is fully Dockerized with its own independent deployment pipeline managed through Jenkins.
            </p>
            <p>
              Jenkins automates our entire CI/CD workflow with pipelines that handle testing, building, and deployment to production. We use Terraform for infrastructure as code, ensuring reproducible infrastructure provisioning across environments.
            </p>
          </div>
        </div>
      </div>

      {/* Where It Started Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Where It Started</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Before pivoting to mobile, we built a full-featured web platform targeting business users. This early version proved the viability of our core concepts: secure data management, LLM integration, and multi-device sync.
          </p>
        </div>
        <div className="space-y-3">
          <div className="relative w-full aspect-video overflow-hidden rounded-3xl bg-slate-100">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              <source src="/videos/OrriAI/orri_ai_web_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-slate-600 italic">Original Web Platform</p>
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


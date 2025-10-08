export function IntroSection() {
  return (
    <section id="intro" className="min-h-screen flex items-center px-6 lg:px-32 pl-24 lg:pl-48">
      <div className="max-w-5xl">
        <div className="text-8xl md:text-9xl font-bold mb-16 leading-none text-black">
          Matt Carroll
        </div>

        <p className="text-2xl md:text-3xl text-gray-600 mb-3">Hey, here's what I'm working on</p>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mb-10" />

        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
          Building AI infrastructure and distributed systems. Co-founder focused on E2E encryption,
          Kubernetes orchestration, and creating developer tools that scale.
        </p>
      </div>
    </section>
  );
}

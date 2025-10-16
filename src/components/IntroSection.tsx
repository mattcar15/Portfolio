export function IntroSection() {
  return (
    <section id="intro" className="min-h-screen flex items-center px-6 lg:px-32 xs:pl-24 lg:pl-48">
      <div className="max-w-5xl">
        <div className="text-8xl md:text-9xl font-bold mb-16 leading-none bg-[linear-gradient(160deg,#fc860d,#eb491f)] bg-clip-text text-transparent">
          Matt Carroll
        </div>

        <p className="text-2xl md:text-3xl text-gray-600 mb-3">Hey, here's a bit about me</p>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mb-10 rounded-full" />

        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
          I like building both digital and physical projects. This page is the home of some of the those projects and stuff I've worked on!
        </p>
      </div>
    </section>
  );
}

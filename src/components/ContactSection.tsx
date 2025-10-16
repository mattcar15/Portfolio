import { Send, Github, Linkedin } from 'lucide-react';

type ContactSectionProps = {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
};

export function ContactSection({ email, githubUrl, linkedinUrl }: ContactSectionProps) {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl text-center">
        <h2 className="text-6xl md:text-7xl font-bold mb-12 text-black">Let&apos;s work together</h2>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-16 mx-auto max-w-3xl leading-relaxed">
          I&apos;m always interested in hearing about new projects and opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-16 justify-center">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all text-base font-medium group"
          >
            <span className="relative inline-flex w-5 h-5 items-center justify-center overflow-hidden">
              <Send className="w-5 h-5 contact-send-icon" />
            </span>
            <span>Get in touch</span>
          </a>
        </div>

        <div className="flex gap-5 justify-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-black transition-all hover:scale-110"
          >
            <Github className="w-7 h-7 text-black" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-black transition-all hover:scale-110"
          >
            <Linkedin className="w-7 h-7 text-black" />
          </a>
        </div>
      </div>
    </section>
  );
}

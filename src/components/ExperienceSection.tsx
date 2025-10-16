export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
};

type ExperienceSectionProps = {
  experience: ExperienceItem[];
  skills: string[];
  selectedImpact: string[];
  education: {
    institution: string;
    degree: string;
    location: string;
    graduation: string;
    gpa?: string;
    coursework?: string[];
  };
};

export function ExperienceSection({ experience, skills, selectedImpact, education }: ExperienceSectionProps) {
  return (
    <section id="resume" className="min-h-screen py-32 px-6 lg:px-32 xs:pl-20 sm:pl-10 lg:pl-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold mb-16 text-black">Experience</h2>

        <div className="space-y-24 mb-32">
          {experience.map((job, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <div className="text-sm text-gray-500 mb-2">{job.period}</div>
                <div className="text-sm text-gray-400">{job.location}</div>
              </div>
              <div className="lg:col-span-9">
                <h3 className="text-4xl font-bold mb-2">{job.title}</h3>
                <div className="text-2xl mb-6">{job.company}</div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-gray-600 leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-px before:bg-gradient-to-r before:from-orange-500 before:to-blue-600"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h3 className="text-3xl font-bold mb-8">Skills & Technologies</h3>
          <ul className="space-y-3 text-xl text-gray-600 leading-relaxed">
            {skills.map((skill, index) => (
              <li key={index} className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-px before:bg-gradient-to-r before:from-orange-500 before:to-blue-600">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-16">
          <h3 className="text-3xl font-bold mb-6">Education</h3>
          <div className="text-2xl font-semibold">{education.institution}</div>
          <div className="text-lg mt-2">{education.degree}</div>
          <div className="text-sm text-gray-500 mt-2">
            {education.location} • {education.graduation}
            {education.gpa ? ` • GPA: ${education.gpa}` : ''}
          </div>
          {education.coursework && education.coursework.length > 0 && (
            <div className="text-base text-gray-600 leading-relaxed mt-4">
              <span className="font-semibold text-gray-700">Relevant Coursework:</span> {education.coursework.join(' • ')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

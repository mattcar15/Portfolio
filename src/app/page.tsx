'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SideNav } from '@/components/SideNav';
import { IntroSection } from '@/components/IntroSection';
import { ProjectsSection, Project } from '@/components/ProjectsSection';
import { ExperienceSection, ExperienceItem } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { celnaMetadata } from '@/components/projects/Celna';
import { orriAIMetadata } from '@/components/projects/OrriAI';
import { memoirMetadata } from '@/components/projects/Memoir';
import { sproutMetadata } from '@/components/projects/Sprout';
import { bambuConnectMetadata } from '@/components/projects/BambuConnect';
import { carCamperMetadata } from '@/components/projects/CarCamper';
import { magSleeveMetadata } from '@/components/projects/MagSleeve';
import { wdtToolMetadata } from '@/components/projects/WDTTool';

const gradientPalette = [
  { stops: ['#FFA62E', '#EA4D2C'], className: 'from-[#FFA62E] to-[#EA4D2C]' },
  { stops: ['#6EE2F5', '#6454F0'], className: 'from-[#6EE2F5] to-[#6454F0]' },
  { stops: ['#FFCF1B', '#FF881B'], className: 'from-[#FFCF1B] to-[#FF881B]' },
  { stops: ['#6FE893', '#39A275'], className: 'from-[#6FE893] to-[#39A275]' },
  { stops: ['#ED876C', '#E3293E'], className: 'from-[#ED876C] to-[#E3293E]' },
  { stops: ['#3EC3B9', '#208CB0'], className: 'from-[#3EC3B9] to-[#208CB0]' },
  { stops: ['#FF6A00', '#EE0979'], className: 'from-[#FF6A00] to-[#EE0979]' },
] as const;

type ProjectBaseData = Omit<Project, 'gradient' | 'gradientStops'>;

const projectBaseData: ProjectBaseData[] = [
  celnaMetadata,
  orriAIMetadata,
  bambuConnectMetadata,
  memoirMetadata,
  sproutMetadata,
  carCamperMetadata,
  wdtToolMetadata,
  magSleeveMetadata
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section when body is position:fixed (project card is open)
      if (document.body.style.position === 'fixed') {
        return;
      }
      
      const sections = ['intro', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'intro', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const projects = useMemo<Project[]>(() => {
    return projectBaseData.map((project, index) => {
      const paletteEntry = gradientPalette[index % gradientPalette.length];

      return {
        ...project,
        gradient: paletteEntry.className,
        gradientStops: [...paletteEntry.stops],
      };
    });
  }, []);

  const experience: ExperienceItem[] = [
    {
      title: "Co-founder & CEO",
      company: "Celna",
      period: "Nov 2024 – Present",
      location: "Boston, MA",
      description: "Co-founding Celna and leading technical architecture for an encrypted data platform that evolved into an MCP multiplexing service.",
      achievements: [
        "Designed and built an end-to-end encrypted cross-device sync system with per-user keys, shared state, and server-opaque storage",
        "Architected and ran a Kubernetes platform on EKS spanning FastAPI/Java services, Redis, Kafka, Keycloak, and Qdrant with automated CloudFormation + Jenkins delivery",
        "Evolved the product into an MCP multiplexing layer with dynamic OAuth, credential management, and permissioning across connectors",
        "Created an automated MCP connector builder combining templated CloudFormation, Jenkins, and code scaffolding for rapid new integrations"
      ]
    },
    {
      title: "Software Engineer (SDE II)",
      company: "Amazon Web Services",
      period: "Apr 2024 – Oct 2024",
      location: "Hybrid",
      description: "Led key infrastructure efforts for the AWS DMS × Amazon RDS Zero-ETL partnership.",
      achievements: [
        "Owned infrastructure build-out, billing and entitlements, and core platform setup for the Zero-ETL integration",
        "Co-designed core Zero-ETL architecture leveraging Fargate, Lambda, SQS, S3, and internal DMS services in partnership with adjacent orgs",
        "Built and maintained multi-region CI/CD pipelines with automated deployments to 30+ AWS regions",
        "Led onboarding and mentorship for most new engineers on the team and authored runbooks and checklists",
        "Served as Security Guardian, ensuring secure defaults and facilitating reviews"
      ]
    },
    {
      title: "Software Engineer (SDE I)",
      company: "Amazon Web Services",
      period: "Aug 2022 – Mar 2024",
      location: "Hybrid",
      description: "Delivered large-scale data migration capabilities within AWS Database Migration Service.",
      achievements: [
        "Shipped the AWS DMS → Amazon Timestream endpoint covering initial load and CDC across C/C++ engine code and Java services",
        "Led a major engine release for DMS and authored team-wide major-version rollout guidelines",
        "Implemented streaming targets for Kinesis and Kafka, handling complex type mapping and high-throughput ingestion",
        "Built and operated automated release and deployment pipelines to boost reliability and developer velocity"
      ]
    },
    {
      title: "Earlier Experience",
      company: "Amazon, Klaviyo, Radius Technologies",
      period: "May 2020 – Jul 2021",
      location: "Remote & Boston, MA",
      description: "Internships spanning database migrations, developer tooling, and mobile applications.",
      achievements: [
        "Amazon — SDE Intern, DMS (May 2021 – Jul 2021): prototyped DMS migration to Amazon Timestream across C/C++ and Java",
        "Klaviyo — Software Engineering Intern (Jan 2021 – Apr 2021): delivered React features and Selenium tooling for performance and asset audits",
        "Radius Technologies — Software Engineering Intern (May 2020 – Aug 2020): built Swift/React Native apps with Apple Vision and Firebase/AWS backends"
      ]
    }
  ];

  const skills = [
    "Languages: Java (advanced), Python (advanced), C/C++ (intermediate), JavaScript/TypeScript, SQL",
    "Cloud & Infra: AWS (DMS, RDS, Lambda, Fargate, SQS, S3, EKS, IAM), Kubernetes, CloudFormation, Jenkins, Docker",
    "Data & Streaming: Amazon Timestream, PostgreSQL/MySQL, Kafka/Kinesis, Redis, Qdrant",
    "Security: IAM design, Keycloak, service-to-service authentication, Security Guardian best practices",
    "Frameworks: FastAPI, Next.js, React Native"
  ];

  const education = {
    institution: "Georgia Institute of Technology",
    degree: "B.S. in Computer Science",
    location: "Atlanta, GA",
    graduation: "May 2022",
    gpa: "3.9",
    coursework: [
      "Natural Language Processing",
      "Computer Vision",
      "Honors Algorithms",
      "Systems & Networks",
      "Databases"
    ]
  };

  const selectedImpact = [
    "Led DMS major engine release and defined team-wide major-version release guidelines",
    "Built and operated global multi-region pipelines that standardized deployment patterns across the team",
    "Mentored and onboarded the majority of new hires, improving time-to-first-PR and service ownership readiness",
    "Delivered server-opaque end-to-end encrypted sync and an MCP connector factory enabling rapid integrations"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetPosition = element.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // Match the indicator animation duration
    let startTime: number | null = null;

    // Ease-out function to match the indicator's ease-out timing
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easeOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="min-h-screen bg-white">
      <SideNav sections={sections} activeSection={activeSection} onNavigate={scrollToSection} />
      <IntroSection />
      <ProjectsSection projects={projects} />
      <ExperienceSection
        experience={experience}
        skills={skills}
        education={education}
        selectedImpact={selectedImpact}
      />
      <ContactSection
        email="mwcarroll12@gmail.com"
        githubUrl="https://github.com/mattcar15"
        linkedinUrl="https://www.linkedin.com/in/matt-w-carroll/"
      />
    </div>
  );
}

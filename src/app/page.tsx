'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SideNav } from '@/components/SideNav';
import { IntroSection } from '@/components/IntroSection';
import { ProjectsSection, Project } from '@/components/ProjectsSection';
import { ExperienceSection, ExperienceItem } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';

const gradientPalette = [
  { stops: ['#FFA62E', '#EA4D2C'], className: 'from-[#FFA62E] to-[#EA4D2C]' },
  { stops: ['#6EE2F5', '#6454F0'], className: 'from-[#6EE2F5] to-[#6454F0]' },
  { stops: ['#FFCF1B', '#FF881B'], className: 'from-[#FFCF1B] to-[#FF881B]' },
  { stops: ['#6FE893', '#39A275'], className: 'from-[#6FE893] to-[#39A275]' },
  { stops: ['#FFCDA5', '#EE4D5F'], className: 'from-[#FFCDA5] to-[#EE4D5F]' },
  { stops: ['#3EC3B9', '#208CB0'], className: 'from-[#3EC3B9] to-[#208CB0]' },
  { stops: ['#FF6A00', '#EE0979'], className: 'from-[#FF6A00] to-[#EE0979]' },
] as const;

type ProjectBaseData = Omit<Project, 'gradient' | 'gradientStops'>;

const projectBaseData: ProjectBaseData[] = [
  {
    id: 1,
    title: "Orri AI",
    description: "E2E encrypted AI agent platform with proprietary sync mechanism",
    type: "gradient",
    tags: ["FastAPI", "K8s", "E2E Encryption"],
    height: "h-[400px]"
  },
  {
    id: 2,
    title: "Celna",
    description: "Okta-styled MCP service with auto-generation and testing",
    type: "gradient",
    tags: ["Kafka", "Redis", "Postgres"],
    height: "h-[500px]"
  },
  {
    id: 3,
    title: "Infrastructure Automation",
    description: "CloudFormation and Helm-based Kubernetes deployment system",
    type: "gradient",
    tags: ["Jenkins", "CloudFormation", "Helm"],
    height: "h-[450px]"
  },
  {
    id: 4,
    title: "Data Sync Engine",
    description: "Novel E2E encrypted synchronization mechanism for distributed devices",
    type: "gradient",
    tags: ["Python", "Qdrant", "Distributed Systems"],
    height: "h-[380px]"
  },
  {
    id: 5,
    title: "API Gateway",
    description: "High-performance API gateway with rate limiting and authentication",
    type: "gradient",
    tags: ["Go", "Redis", "gRPC"],
    height: "h-[420px]"
  },
  {
    id: 6,
    title: "Real-time Analytics",
    description: "Real-time data processing and analytics platform",
    type: "gradient",
    tags: ["Apache Flink", "Kafka", "TimescaleDB"],
    height: "h-[480px]"
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
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
      title: "Co-Founder",
      company: "Celna",
      period: "2024 - 2025",
      location: "Somerville, MA",
      description: "Co-founded an AI company building cutting-edge infrastructure for AI agent platforms. Led the technical architecture and DevOps strategy through strategic pivots from an encrypted AI agent platform to an Okta-styled MCP service.",
      achievements: [
        "Designed and built E2E encrypted sync mechanism enabling server-mediated synchronization while maintaining zero-knowledge architecture",
        "Architected CI/CD pipelines in Jenkins and CloudFormation templates for automated Kubernetes infrastructure deployment",
        "Built microservices using FastAPI, Redis, Kafka, Postgres, and Qdrant for high-performance distributed systems",
        "Developed system to automatically generate and test MCP servers, handling auth and hosting for any MCP client"
      ]
    },
    {
      title: "Software Engineer",
      company: "Amazon",
      period: "Previous Experience",
      location: "Greater Boston",
      description: "Contributed to large-scale distributed systems and cloud infrastructure.",
      achievements: []
    }
  ];

  const skills = [
    "Kubernetes", "Docker", "Jenkins", "CloudFormation", "Helm", "FastAPI", "Python",
    "Redis", "Kafka", "PostgreSQL", "Qdrant", "AWS", "Microservices", "E2E Encryption",
    "Distributed Systems", "CI/CD", "Infrastructure as Code", "Vector Databases"
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <SideNav sections={sections} activeSection={activeSection} onNavigate={scrollToSection} />
      <IntroSection />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} skills={skills} />
      <ContactSection
        email="mwcarroll12@gmail.com"
        githubUrl="https://github.com/mattcar15"
        linkedinUrl="https://www.linkedin.com/in/matt-w-carroll/"
      />
    </div>
  );
}

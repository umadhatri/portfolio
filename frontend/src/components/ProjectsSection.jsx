import React from "react";
import { ExternalLink, Github, Cloud, Activity, Brain } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AWS Security Training Environment",
      subtitle: "Cyberrange",
      description:
        "Architected multi-tier AWS infrastructure for hands-on cybersecurity training. Implemented security monitoring, logging, and incident response scenarios. Designed vulnerable-by-design environments for practicing defensive security techniques.",
      tags: ["AWS", "Terraform", "Security Monitoring", "Incident Response"],
      icon: Cloud,
      blueprint: [
        "VPC Architecture",
        "Security Groups",
        "EC2 Instances",
        "S3 Logging",
        "CloudWatch",
      ],
    },
    {
      title: "System Process Monitor",
      subtitle: "Anomaly Detection",
      description:
        "Created a user-friendly program to monitor system processes and visualize system resource usage. Implemented machine learning algorithms for detecting anomalous behavior patterns.",
      tags: ["PyQt5", "Scikit-learn", "Python", "ML"],
      icon: Activity,
      blueprint: [
        "Process Monitoring",
        "Resource Visualization",
        "Anomaly Detection",
        "Real-time Alerts",
      ],
    },
    {
      title: "Custom RAG System",
      subtitle: "LLM Integration",
      description:
        "Developed and troubleshot a specialized Retrieval-Augmented Generation system for secure information retrieval. Integrated LLM capabilities with custom knowledge bases to enhance response accuracy while maintaining security standards.",
      tags: ["LLM", "RAG", "Python", "NLP"],
      icon: Brain,
      blueprint: [
        "Document Indexing",
        "Vector Database",
        "LLM Integration",
        "Response Generation",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-[#E0E0E0] mb-4">
            <span className="text-[#00FF41]">##</span> Featured_Projects
          </h2>
          <div className="w-32 h-1 bg-[#00FF41]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg overflow-hidden hover:border-[#00FF41] transition-all duration-300 group hover:shadow-lg hover:shadow-[#00FF41]/20"
              >
                {/* Project Header */}
                <div className="p-6 border-b border-[#00FF41]/20">
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent
                      className="text-[#00FF41] group-hover:animate-pulse"
                      size={32}
                    />
                    <ExternalLink
                      className="text-[#A0A0A0] hover:text-[#00FF41] cursor-pointer transition-colors"
                      size={20}
                    />
                  </div>
                  <h3 className="text-[#E0E0E0] font-mono font-bold text-xl mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[#00FF41] font-mono text-sm">
                    {project.subtitle}
                  </p>
                </div>

                {/* Project Description */}
                <div className="p-6">
                  <p className="text-[#A0A0A0] font-mono text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Blueprint/Architecture */}
                  <div className="mb-6">
                    <h4 className="text-[#E0E0E0] font-mono text-sm font-bold mb-3 flex items-center">
                      <span className="text-[#00FF41] mr-2">●</span>
                      Architecture
                    </h4>
                    <div className="bg-[#121212] border border-[#00FF41]/10 rounded p-4">
                      {project.blueprint.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 mb-2 last:mb-0"
                        >
                          <span className="text-[#00FF41] text-xs">└─</span>
                          <span className="text-[#A0A0A0] font-mono text-xs">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-[#121212] border border-[#00FF41]/30 rounded-full text-[#00FF41] font-mono text-xs"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
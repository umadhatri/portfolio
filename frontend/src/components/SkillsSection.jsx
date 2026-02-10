import React from "react";
import { Database, Globe, Server, Lock, Code, Layers } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Security Operations",
      icon: Shield,
      skills: [
        "WAZUH SIEM",
        "Incident Response",
        "Security Monitoring",
        "Anomaly Detection",
        "Threat Detection",
        "Vulnerability Assessment",
      ],
    },
    {
      title: "Cloud & Infrastructure",
      icon: Server,
      skills: [
        "AWS Cloud Security",
        "Terraform (IaC)",
        "Linux/Ubuntu Admin",
        "Virtual Machine Management",
      ],
    },
    {
      title: "Development",
      icon: Code,
      skills: ["Python", "Bash Scripting", "Git", "PyQt5", "Scikit-learn"],
    },
    {
      title: "Specialties",
      icon: Layers,
      skills: ["CTF (Web/Pwn)", "RAG Systems", "LLM Integration"],
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-[#E0E0E0] mb-4">
            <span className="text-[#00FF41]">##</span> Technical_Arsenal
          </h2>
          <div className="w-32 h-1 bg-[#00FF41]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-6 hover:border-[#00FF41] transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent
                    className="text-[#00FF41] group-hover:animate-pulse"
                    size={24}
                  />
                  <h3 className="text-[#E0E0E0] font-mono font-bold">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-[#A0A0A0] font-mono text-sm flex items-center space-x-2 group/item"
                    >
                      <span className="text-[#00FF41] opacity-0 group-hover/item:opacity-100 transition-opacity">
                        ▸
                      </span>
                      <span className="group-hover/item:text-[#E0E0E0] transition-colors">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-12 bg-[#1E1E1E] border border-[#FFD700]/30 rounded-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Lock className="text-[#FFD700]" size={32} />
            </div>
            <div>
              <h3 className="text-[#E0E0E0] font-mono font-bold text-xl mb-2">
                Google Professional Certificate in Cybersecurity
              </h3>
              <p className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
                Comprehensive training in security operations including: Security
                incident detection, investigation, and response (NIST framework);
                Network traffic analysis and intrusion detection; Linux command
                line and SQL for security analysts; SIEM tools and log analysis
                techniques; Asset classification, threat modeling, and
                vulnerability management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Shield = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default SkillsSection;
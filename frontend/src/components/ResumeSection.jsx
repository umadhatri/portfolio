import React, { useState } from "react";
import { Eye, EyeOff, FileText, Award, Briefcase } from "lucide-react";

const ResumeSection = () => {
  const [revealedItems, setRevealedItems] = useState({});

  const toggleReveal = (itemId) => {
    setRevealedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const RedactedText = ({ text, itemId }) => {
    const isRevealed = revealedItems[itemId];
    return (
      <span
        className="relative inline-block cursor-pointer group"
        onClick={() => toggleReveal(itemId)}
      >
        {isRevealed ? (
          <span className="text-[#00FF41] font-bold">{text}</span>
        ) : (
          <>
            <span className="text-[#E0E0E0]">{text}</span>
            <span className="absolute inset-0 bg-[#E0E0E0] group-hover:bg-[#00FF41]/30 transition-colors"></span>
          </>
        )}
      </span>
    );
  };

  return (
    <section id="resume" className="py-20 px-4 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-[#E0E0E0]">
              <span className="text-[#00FF41]">##</span> Classified_Dossier
            </h2>
            <div className="flex items-center space-x-2 text-[#A0A0A0] font-mono text-sm">
              <FileText size={16} />
              <span>CLEARANCE: PUBLIC</span>
            </div>
          </div>
          <div className="w-32 h-1 bg-[#00FF41]"></div>
          <p className="text-[#A0A0A0] font-mono text-sm mt-4">
            [REDACTED] sections will reveal on hover. Click to toggle.
          </p>
        </div>

        <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-8 font-mono">
          {/* Header */}
          <div className="border-b border-[#00FF41]/20 pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#E0E0E0] mb-2">
                  UMADHATRI DURVASULA
                </h3>
                <p className="text-[#A0A0A0] text-sm">
                  SUBJECT ID: UMA-2025-CYBEROPS
                </p>
              </div>
              <div className="text-right text-[#A0A0A0] text-sm">
                <p>CLASSIFICATION: PUBLIC</p>
                <p className="text-[#00FF41]">STATUS: ACTIVE</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="text-[#00FF41]" size={20} />
              <h4 className="text-xl font-bold text-[#E0E0E0]">
                OPERATIONAL HISTORY
              </h4>
            </div>

            <div className="bg-[#121212] border border-[#00FF41]/10 rounded p-6 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="text-[#00FF41] font-bold">PROJECT ENGINEER</h5>
                  <p className="text-[#E0E0E0] text-sm">CySTAR - IIT Madras</p>
                </div>
                <span className="text-[#A0A0A0] text-sm">Jun 2025 - Present</span>
              </div>

              <ul className="space-y-2 text-sm text-[#A0A0A0]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF41] mt-1">•</span>
                  <span>
                    Monitored and analyzed security events using{" "}
                    <RedactedText text="WAZUH SIEM" itemId="wazuh" />,
                    investigating anomalies and potential security incidents across
                    Ubuntu-based infrastructure.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF41] mt-1">•</span>
                  <span>
                    Designed and implemented multiple{" "}
                    <RedactedText text="Capture The Flag (CTF)" itemId="ctf" />{" "}
                    challenges for CySTAR CTF, specializing in web-based
                    vulnerabilities and binary exploitation.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF41] mt-1">•</span>
                  <span>
                    Architected secure{" "}
                    <RedactedText text="AWS-based Cyberrange" itemId="aws" />{" "}
                    environment for cybersecurity training, implementing security
                    controls and incident response scenarios.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF41] mt-1">•</span>
                  <span>
                    Contributed to development and troubleshooting of custom{" "}
                    <RedactedText
                      text="Retrieval-Augmented Generation (RAG)"
                      itemId="rag"
                    />{" "}
                    systems utilizing large language models.
                  </span>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-[#00FF41]/10">
                <p className="text-[#00FF41] text-sm font-bold">
                  MISSION SUCCESS METRICS:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded p-3">
                    <p className="text-[#00FF41] text-2xl font-bold">+54%</p>
                    <p className="text-[#A0A0A0] text-xs">Answer Quality</p>
                  </div>
                  <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded p-3">
                    <p className="text-[#00FF41] text-2xl font-bold">-91%</p>
                    <p className="text-[#A0A0A0] text-xs">Failure Cases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="text-[#00FF41]" size={20} />
              <h4 className="text-xl font-bold text-[#E0E0E0]">
                ACADEMIC CREDENTIALS
              </h4>
            </div>

            <div className="bg-[#121212] border border-[#00FF41]/10 rounded p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="text-[#00FF41] font-bold">
                    B.TECH, ELECTRONICS AND COMMUNICATIONS ENGINEERING
                  </h5>
                  <p className="text-[#E0E0E0] text-sm">
                    Sreenidhi Institute of Science and Technology
                  </p>
                </div>
                <span className="text-[#A0A0A0] text-sm">Dec 2021 - Jun 2025</span>
              </div>
              <p className="text-[#A0A0A0] text-sm">
                <span className="text-[#00FF41]">GPA:</span> 8.92/10.0
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center pt-6 border-t border-[#00FF41]/20">
            <a
              href="https://customer-assets.emergentagent.com/job_d32f5615-fff6-4e44-be79-6ad0ef37b9f1/artifacts/7cv35bnf_Umadhatri_Durvasula.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#00FF41] text-[#121212] font-bold rounded hover:bg-[#FFD700] transition-colors duration-300 flex items-center space-x-2"
            >
              <FileText size={20} />
              <span>DOWNLOAD FULL DOSSIER</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
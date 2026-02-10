import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Key, Circle } from "lucide-react";

const Footer = () => {
  const [showPGP, setShowPGP] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Monitoring Infrastructure");
  const [statusColor, setStatusColor] = useState("#00FF41");

  const statuses = [
    { message: "Monitoring Infrastructure", color: "#00FF41" },
    { message: "Analyzing Logs", color: "#FFD700" },
    { message: "Deploying Exploit", color: "#FF5F57" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatusMessage(randomStatus.message);
      setStatusColor(randomStatus.color);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBGExample...
[Your actual PGP public key would go here]
...ExampleEnd
-----END PGP PUBLIC KEY BLOCK-----`;

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#00FF41]/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Circle
            className="animate-pulse"
            size={12}
            fill={statusColor}
            color={statusColor}
          />
          <span className="text-[#A0A0A0] font-mono text-sm">
            Status: <span style={{ color: statusColor }}>{statusMessage}</span>
          </span>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/umadhatri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E0E0E0] hover:text-[#00FF41] transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/uma-dhatri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E0E0E0] hover:text-[#00FF41] transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:umadhatridurvasula@gmail.com"
            className="text-[#E0E0E0] hover:text-[#00FF41] transition-colors"
          >
            <Mail size={24} />
          </a>
          <button
            onClick={() => setShowPGP(!showPGP)}
            className="text-[#E0E0E0] hover:text-[#00FF41] transition-colors"
            title="PGP Public Key"
          >
            <Key size={24} />
          </button>
        </div>

        {/* PGP Key Modal */}
        {showPGP && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-[#1E1E1E] border border-[#00FF41]/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[#00FF41] font-mono font-bold">
                  PGP Public Key
                </h4>
                <button
                  onClick={() => setShowPGP(false)}
                  className="text-[#A0A0A0] hover:text-[#E0E0E0]"
                >
                  Close
                </button>
              </div>
              <pre className="bg-[#121212] border border-[#00FF41]/10 rounded p-4 text-[#A0A0A0] font-mono text-xs overflow-x-auto">
                {pgpKey}
              </pre>
              <p className="text-[#A0A0A0] font-mono text-xs mt-2">
                For secure communication. Use this key to encrypt messages to me.
              </p>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[#A0A0A0] font-mono text-sm">
            © 2025 Umadhatri Durvasula. Built with{" "}
            <span className="text-[#FF5F57]">&lt;3</span> and Python.
          </p>
          <p className="text-[#A0A0A0] font-mono text-xs mt-2">
            <span className="text-[#00FF41]">[CLASSIFIED]</span> Easter Egg:
            Check console for hidden flags 🕵️
          </p>
        </div>

        {/* HTML Comment Easter Egg */}
        {/* flag{terminal_master_uma_2025} - Congratulations, recruiter! */}
      </div>
    </footer>
  );
};

export default Footer;
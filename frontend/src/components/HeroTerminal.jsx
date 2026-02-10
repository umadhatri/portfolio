import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const HeroTerminal = () => {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const lines = [
    "user@uma:~$ ./introduce_self.sh",
    "> Hello, I'm Umadhatri.",
    "> I architect secure cloud environments.",
    "> Specialized in WAZUH SIEM, AWS, and CTF challenges.",
    "> Type 'help' for available commands.",
  ];

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        const nextChar = currentLine.slice(charIndex, charIndex + 1);
        charIndex++;

        if (!nextChar) {
          clearInterval(typingInterval);
          setDisplayedText((p) => p + "\n");
          setCurrentLineIndex((i) => i + 1);
          return p;
        }

        return prev + nextChar;
      });
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);




  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = (e) => {
    e.preventDefault();
    const command = userInput.trim().toLowerCase();

    let output = "";
    switch (command) {
      case "help":
        output = `Available commands:
  help           - Show this help message
  cat skills.txt - Display technical skills
  whoami         - Display information about me
  clear          - Clear the terminal
  ./contact.sh   - Show contact information`;
        break;
      case "cat skills.txt":
        output = `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Security:
  • WAZUH SIEM
  • Incident Response
  • Security Monitoring
  • Anomaly Detection
  • Threat Detection
  • Vulnerability Assessment
  
Cloud & Infrastructure:
  • AWS Cloud Security
  • Terraform (IaC)
  • Linux/Ubuntu Administration
  • Virtual Machine Management
  
Development:
  • Python
  • Bash Scripting
  • Git
  
Specialties:
  • CTF (Web/Pwn)
  • RAG Systems`;
        break;
      case "whoami":
        output = `Umadhatri Durvasula
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Results-driven Cybersecurity Professional with 1+ years of 
hands-on experience in vulnerability assessment, secure 
system architecture, and cybersecurity operations.

Electronics and Communications Engineering graduate with 
specialized expertise in Ubuntu security monitoring, RAG 
systems implementation, and CTF challenge design.

Google-certified cybersecurity professional with proven 
track record of:
  • Improving system security metrics by 54%
  • Reducing security failure cases by 91%

Currently seeking SOC Analyst or Cybersecurity Engineer 
roles to leverage technical skills in threat detection, 
incident response, and secure infrastructure management.`;
        break;
      case "clear":
        setCommandHistory([]);
        setUserInput("");
        return;
      case "./contact.sh":
        output = `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    umadhatridurvasula@gmail.com
Phone:    +91 9100269265
LinkedIn: linkedin.com/in/uma-dhatri/
GitHub:   github.com/umadhatri

Executing mail client...`;
        setTimeout(() => {
          window.location.href = "mailto:umadhatridurvasula@gmail.com";
        }, 1000);
        break;
      case "":
        setUserInput("");
        return;
      default:
        output = `bash: ${command}: command not found\nType 'help' for available commands.`;
    }

    setCommandHistory((prev) => [
      ...prev,
      { command: userInput, output },
    ]);
    setUserInput("");
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <div className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg border border-[#00FF41]/30 shadow-2xl shadow-[#00FF41]/10 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-b border-[#00FF41]/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
            </div>
            <div className="flex items-center space-x-2 text-[#A0A0A0] text-sm font-mono">
              <Terminal size={16} />
              <span>uma@terminal</span>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-6 font-mono text-sm leading-relaxed h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00FF41]/30 scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Initial typing animation */}
            <pre className="whitespace-pre-wrap text-[#E0E0E0]">
              {typedLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {currentLineText}
            </pre>


            {/* Command history */}
            {commandHistory.map((item, index) => (
              <div key={index} className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#00FF41]">user@uma:~$</span>
                  <span className="text-[#E0E0E0]">{item.command}</span>
                </div>
                <pre className="whitespace-pre-wrap text-[#A0A0A0] mt-2 ml-4">
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Input line */}
            {isTypingComplete && (
              <form onSubmit={handleCommand} className="flex items-center space-x-2 mt-4">
                <span className="text-[#00FF41]">user@uma:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#E0E0E0] caret-[#00FF41]"
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="text-[#00FF41] animate-pulse">_</span>
              </form>
            )}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-[#A0A0A0] text-sm font-mono mt-4">
          💡 Click the terminal and try typing: help, whoami, cat skills.txt
        </p>
      </div>
    </section>
  );
};

export default HeroTerminal;
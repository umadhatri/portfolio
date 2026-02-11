import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

const LINES = [
  "user@uma:~$ ./introduce_self.sh",
  "> Hello, I'm Umadhatri.",
  "> I architect secure cloud environments.",
  "> Specialized in WAZUH SIEM, AWS, and CTF challenges.",
  "> Type 'help' for available commands.",
];

const TYPE_SPEED_MS = 30;
const LINE_PAUSE_MS = 250;

export default function HeroTerminal() {
  const [renderedLines, setRenderedLines] = useState([]);   // fully finished lines
  const [currentText, setCurrentText] = useState("");       // currently typing line
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // --- Typewriter (safe: never reads beyond string length) ---
  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setIsTypingComplete(true);
      return;
    }

    const line = LINES[lineIndex];

    // finished this line → move it into renderedLines, then next line
    if (charIndex >= line.length) {
      const t = setTimeout(() => {
        setRenderedLines((prev) => [...prev, line]);
        setCurrentText("");
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);

      return () => clearTimeout(t);
    }

    // type next char
    const t = setTimeout(() => {
      const nextChar = line.charAt(charIndex); // charAt NEVER returns undefined
      setCurrentText((prev) => prev + nextChar);
      setCharIndex((c) => c + 1);
    }, TYPE_SPEED_MS);

    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  // focus input after typing
  useEffect(() => {
    if (isTypingComplete) inputRef.current?.focus();
  }, [isTypingComplete]);

  // auto-scroll terminal
  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [renderedLines, currentText, commandHistory]);

  const handleCommand = (e) => {
    e.preventDefault();
    const command = userInput.trim();
    const cmdLower = command.toLowerCase();

    let output = "";
    switch (cmdLower) {
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

Currently seeking SOC Analyst / Cybersecurity Engineer roles.`;
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
GitHub:   github.com/umadhatri`;
        break;

      case "":
        setUserInput("");
        return;

      default:
        output = `bash: ${command}: command not found\nType 'help' for available commands.`;
    }

    setCommandHistory((prev) => [...prev, { command, output }]);
    setUserInput("");
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <div className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg border border-[#00FF41]/30 shadow-2xl shadow-[#00FF41]/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-b border-[#00FF41]/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
            </div>
            <div className="flex items-center space-x-2 text-[#A0A0A0] text-sm font-mono">
              <Terminal size={16} />
              <span>uma@terminal</span>
            </div>
            <div className="w-16" />
          </div>

          {/* Body */}
          <div
            ref={terminalRef}
            className="p-6 font-mono text-sm leading-relaxed h-[500px] overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {/* typed intro */}
            <div className="whitespace-pre-wrap text-[#E0E0E0]">
              {renderedLines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
              {lineIndex < LINES.length && <div>{currentText}</div>}
            </div>

            {/* history */}
            {commandHistory.map((item, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#00FF41]">user@uma:~$</span>
                  <span className="text-[#E0E0E0]">{item.command}</span>
                </div>
                <pre className="whitespace-pre-wrap text-[#A0A0A0] mt-2 ml-4">{item.output}</pre>
              </div>
            ))}

            {/* prompt */}
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

        <p className="text-center text-[#A0A0A0] text-sm font-mono mt-4">
          💡 Try: <span className="text-[#E0E0E0]">help</span>,{" "}
          <span className="text-[#E0E0E0]">whoami</span>,{" "}
          <span className="text-[#E0E0E0]">cat skills.txt</span>
        </p>
      </div>
    </section>
  );
}
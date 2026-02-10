import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Shield, Zap } from "lucide-react";

const GlitchNumber = ({ targetNumber, suffix = "%", duration = 2000 }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setIsGlitching(true);

            // Glitch effect
            const glitchInterval = setInterval(() => {
              setDisplayNumber(Math.floor(Math.random() * 100));
            }, 50);

            // Smooth count up after glitch
            setTimeout(() => {
              clearInterval(glitchInterval);
              let current = 0;
              const increment = targetNumber / (duration / 50);
              const countInterval = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                  setDisplayNumber(targetNumber);
                  setIsGlitching(false);
                  clearInterval(countInterval);
                } else {
                  setDisplayNumber(Math.floor(current));
                }
              }, 50);
            }, 1000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration, hasAnimated]);

  return (
    <span
      ref={elementRef}
      className={`text-5xl md:text-6xl font-bold font-mono ${
        isGlitching ? "text-[#FFD700] animate-pulse" : "text-[#00FF41]"
      }`}
      style={{
        textShadow: isGlitching
          ? "0 0 10px #FFD700, 0 0 20px #FFD700"
          : "0 0 10px #00FF41",
      }}
    >
      {displayNumber}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-[#E0E0E0] mb-4">
            <span className="text-[#00FF41]">##</span> Performance_Metrics
          </h2>
          <p className="text-[#A0A0A0] font-mono">Quantifiable impact on system security</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-8 text-center hover:border-[#00FF41] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF41]/20">
            <div className="flex justify-center mb-4">
              <TrendingUp className="text-[#00FF41]" size={40} />
            </div>
            <GlitchNumber targetNumber={54} suffix="%" />
            <p className="text-[#A0A0A0] font-mono mt-4 text-sm">
              Improved answer quality in RAG systems
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-8 text-center hover:border-[#00FF41] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF41]/20">
            <div className="flex justify-center mb-4">
              <Shield className="text-[#00FF41]" size={40} />
            </div>
            <GlitchNumber targetNumber={91} suffix="%" />
            <p className="text-[#A0A0A0] font-mono mt-4 text-sm">
              Reduced security failure cases
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-8 text-center hover:border-[#00FF41] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF41]/20">
            <div className="flex justify-center mb-4">
              <Zap className="text-[#00FF41]" size={40} />
            </div>
            <div className="text-5xl md:text-6xl font-bold font-mono text-[#00FF41]">
              1+
            </div>
            <p className="text-[#A0A0A0] font-mono mt-4 text-sm">
              Years in cybersecurity operations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-[#00FF41]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-[#00FF41] text-xl font-mono animate-pulse">▸</span>
            <span className="text-[#E0E0E0] font-mono font-bold text-lg">Uma</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { label: "./about", id: "hero" },
              { label: "./projects", id: "projects" },
              { label: "./resume", id: "resume" },
              { label: "./contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#E0E0E0] font-mono text-sm hover:text-[#00FF41] transition-colors duration-200 relative group"
              >
                <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-200 mr-1">
                  ▸
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00FF41] hover:text-[#FFD700] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1E1E1E] border-t border-[#00FF41]/20">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {[
              { label: "./about", id: "hero" },
              { label: "./projects", id: "projects" },
              { label: "./resume", id: "resume" },
              { label: "./contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-[#E0E0E0] font-mono text-sm hover:text-[#00FF41] transition-colors duration-200 py-2"
              >
                <span className="mr-2">▸</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
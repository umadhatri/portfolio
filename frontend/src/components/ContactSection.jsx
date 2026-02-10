import React from "react";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "umadhatridurvasula@gmail.com",
      link: "mailto:umadhatridurvasula@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9100269265",
      link: "tel:+919100269265",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/uma-dhatri/",
      link: "https://linkedin.com/in/uma-dhatri/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/umadhatri",
      link: "https://github.com/umadhatri",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-[#E0E0E0] mb-4">
            <span className="text-[#00FF41]">##</span> Initiate_Contact
          </h2>
          <div className="w-32 h-1 bg-[#00FF41]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg p-8">
              <h3 className="text-xl font-mono font-bold text-[#E0E0E0] mb-6">
                Contact Channels
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-[#121212] border border-[#00FF41]/10 rounded hover:border-[#00FF41] transition-all duration-300 group"
                    >
                      <IconComponent
                        className="text-[#00FF41] group-hover:animate-pulse"
                        size={24}
                      />
                      <div>
                        <p className="text-[#A0A0A0] text-xs font-mono">
                          {method.label}
                        </p>
                        <p className="text-[#E0E0E0] font-mono text-sm group-hover:text-[#00FF41] transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Message Terminal */}
          <div>
            <div className="bg-[#1E1E1E] border border-[#00FF41]/20 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-b border-[#00FF41]/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
                </div>
                <span className="text-[#A0A0A0] text-xs font-mono">
                  send_message.sh
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-mono font-bold text-[#E0E0E0] mb-6">
                  Send a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-[#00FF41] font-mono text-sm mb-2">
                      $ name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#121212] border border-[#00FF41]/30 rounded px-4 py-2 text-[#E0E0E0] font-mono focus:outline-none focus:border-[#00FF41] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#00FF41] font-mono text-sm mb-2">
                      $ email:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#121212] border border-[#00FF41]/30 rounded px-4 py-2 text-[#E0E0E0] font-mono focus:outline-none focus:border-[#00FF41] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[#00FF41] font-mono text-sm mb-2">
                      $ message:
                    </label>
                    <textarea
                      rows="4"
                      className="w-full bg-[#121212] border border-[#00FF41]/30 rounded px-4 py-2 text-[#E0E0E0] font-mono focus:outline-none focus:border-[#00FF41] transition-colors resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00FF41] text-[#121212] font-mono font-bold py-3 rounded hover:bg-[#FFD700] transition-colors duration-300"
                  >
                    ./send_message.sh
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
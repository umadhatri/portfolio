// script.js - Pure JavaScript logic for typewriter effect, terminal emulation, and navbar active states

document.addEventListener('DOMContentLoaded', () => {
    // Initialize background canvas particle system
    initBgCanvas();
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Initialize interactive terminal
    initTerminal();
    
    // Initialize mobile navigation menu toggle
    initNavToggle();
    
    // Initialize scroll observer for active navbar links
    initScrollObserver();
});

/* ==========================================================================
   Background Canvas Particle System
   ========================================================================== */
function initBgCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Config
    const particleCount = 45;
    const connectionDistance = 110;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.18)';
            ctx.fill();
        }
    }
    
    // Populate particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Fade line color based on proximity
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - dist / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
}

/* ==========================================================================
   Hero Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const roles = ['Infrastructure Engineer', 'Security Engineer', 'CTF Builder'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Dynamic speeds
        let speed = isDeleting ? 30 : 75;
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Full role typed: pause before deleting
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Role deleted: pause and switch to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    };
    
    // Initial delay before first word begins typing
    setTimeout(type, 800);
}

/* ==========================================================================
   Interactive Terminal Emulator
   ========================================================================== */
function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (!terminalInput || !terminalBody || !terminalOutput) return;
    
    // Command History
    let history = [];
    let historyIndex = -1;
    const maxHistoryLength = 10;
    
    // Auto-focus on click anywhere inside the terminal window
    const terminalWindow = document.getElementById('terminal-window');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
    
    // Focus terminal input initially
    terminalInput.focus();
    
    // Command response mapper
    const handleCommand = async (cmdString) => {
        const cmd = cmdString.trim();
        const cmdClean = cmd.toLowerCase();
        
        // Print the prompt line with user's input
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-prompt-line';
        promptLine.innerHTML = `<span class="prompt-text">uma@portfolio:~$</span> <span class="input-text">${escapeHTML(cmd)}</span>`;
        terminalOutput.appendChild(promptLine);
        
        if (cmd === '') {
            scrollTerminal();
            return;
        }
        
        // Add to history
        history.push(cmd);
        if (history.length > maxHistoryLength) {
            history.shift();
        }
        historyIndex = history.length;
        
        // Parse Command
        let responseLines = [];
        
        switch (cmdClean) {
            case 'help':
                responseLines = [
                    'Available commands:',
                    '<div class="terminal-table">',
                    '  <div class="terminal-table-col1">help</div><div class="terminal-table-col2">Display this information panel</div>',
                    '  <div class="terminal-table-col1">whoami</div><div class="terminal-table-col2">Display system identification and short bio</div>',
                    '  <div class="terminal-table-col1">skills</div><div class="terminal-table-col2">List technical competencies (languages, infra, security)</div>',
                    '  <div class="terminal-table-col1">experience</div><div class="terminal-table-col2">Review professional history and key achievements</div>',
                    '  <div class="terminal-table-col1">projects</div><div class="terminal-table-col2">List selected engineering projects</div>',
                    '  <div class="terminal-table-col1">contact</div><div class="terminal-table-col2">Show verified connection endpoints</div>',
                    '  <div class="terminal-table-col1">clear</div><div class="terminal-table-col2">Clear the terminal screen</div>',
                    '</div>',
                    'Tip: Try discovering hidden security Easter Eggs (e.g., standard shell utilities).'
                ];
                break;
            case 'whoami':
                responseLines = [
                    '<span class="text-accent">Umadhatri Durvasula</span>',
                    'Role: Infrastructure & Cybersecurity Engineer',
                    'Focus: Cloud Security, Platform Automation, Secure Sandboxing',
                    'Status: Active Practitioner, CySTAR Lab Alumna',
                    'Bio: I design automated labs and secure Cloud infrastructure. I bridge the gap between Dev, Ops, and Defensive Security by developing tools that make provisioning efficient and environments resilient.'
                ];
                break;
            case 'skills':
                responseLines = [
                    'System Capabilities and Competencies:',
                    '<div class="terminal-table">',
                    '  <div class="terminal-table-col1">Languages:</div><div class="terminal-table-col2">Python, Go, Bash, JavaScript, SQL</div>',
                    '  <div class="terminal-table-col1">Infrastructure:</div><div class="terminal-table-col2">Terraform, Docker, AWS, GCP, Nginx, CI/CD, Git</div>',
                    '  <div class="terminal-table-col1">Security:</div><div class="terminal-table-col2">Linux Auditing, Cryptography, Network Forensics, Web Exploitation, Secure RAG Pipelines</div>',
                    '</div>'
                ];
                break;
            case 'experience':
                responseLines = [
                    'Professional Log:',
                    '----------------------------------------',
                    '<span class="text-accent">CySTAR Lab &mdash; Infrastructure & Security Engineer</span>',
                    'Duration: June 2024 - Present | Location: University Center',
                    'Achievements:',
                    ' &bull; Engineered automated CyberRange training platform, decreasing provisioning times from hours to under <strong class="text-accent">4 minutes</strong> via Terraform & Docker.',
                    ' &bull; Supported <strong class="text-accent">500+ active concurrent users</strong> during cybersecurity exercises, balancing network load.',
                    ' &bull; Achieved a <strong class="text-accent">54% RAG quality lift</strong> for documentation systems via embedding optimizations.',
                    ' &bull; Managed challenge design for security events, keeping a live uptime SLA of <strong class="text-accent">91%</strong>.'
                ];
                break;
            case 'projects':
                responseLines = [
                    'Project Registry:',
                    '----------------------------------------',
                    '<span class="text-accent">[1] CyberRange Platform</span>',
                    '    Description: Cloud sandbox for secure, rapid-provisioning training networks.',
                    '    Stack: Terraform, Docker, AWS, Bash, Nginx',
                    '    URL: <a href="https://github.com/umadhatri" class="text-accent" target="_blank">github.com/umadhatri/cyberrange-platform</a>',
                    '',
                    '<span class="text-accent">[2] CTF Challenge Design</span>',
                    '    Description: Network forensics, web exploitation, and cryptographical challenges.',
                    '    Stack: Python, Docker, Cryptography, Linux Auditing',
                    '    URL: <a href="https://github.com/umadhatri" class="text-accent" target="_blank">github.com/umadhatri/ctf-challenges</a>'
                ];
                break;
            case 'contact':
                responseLines = [
                    'Communication Channels:',
                    '<div class="terminal-table">',
                    '  <div class="terminal-table-col1">Email:</div><div class="terminal-table-col2"><a href="mailto:umadhatri.durvasula@gmail.com" class="text-accent">umadhatri.durvasula@gmail.com</a></div>',
                    '  <div class="terminal-table-col1">LinkedIn:</div><div class="terminal-table-col2"><a href="https://linkedin.com/in/umadhatri" class="text-accent" target="_blank">linkedin.com/in/umadhatri</a></div>',
                    '  <div class="terminal-table-col1">GitHub:</div><div class="terminal-table-col2"><a href="https://github.com/umadhatri" class="text-accent" target="_blank">github.com/umadhatri</a></div>',
                    '</div>'
                ];
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                scrollTerminal();
                return;
            
            // Easter eggs
            case 'sudo su':
                responseLines = ['Nice try. You don\'t have root here.'];
                break;
            case 'ls':
            case 'ls -la':
                responseLines = [
                    'total 24',
                    'drwxr-xr-x   5 uma  staff   160 Jun 29 18:54 .',
                    'drwxr-xr-x  12 uma  staff   384 Jun 29 18:54 ..',
                    'drwxr-xr-x   4 uma  staff   128 Jun 29 18:54 <span class="dir-item">ctf-challenges</span>',
                    'drwxr-xr-x   5 uma  staff   160 Jun 29 18:54 <span class="dir-item">cyberrange</span>',
                    '-rw-r--r--   1 uma  staff     0 Jun 29 18:54 <span class="file-item">flag.txt</span>',
                    '-rw-r--r--   1 uma  staff  115445 Jun 29 18:54 <span class="file-item">Uma_s_Resume.pdf</span>'
                ];
                break;
            case 'cat flag.txt':
                responseLines = ['CTF instincts. I like you. Flag: <span class="text-accent">UMA{h1r3_m3_plz}</span>'];
                break;
            case 'ping uma':
                responseLines = [
                    'PING uma.dev (127.0.0.1): 56 data bytes',
                    '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.075 ms',
                    '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.081 ms',
                    '--- uma.dev ping statistics ---',
                    '2 packets transmitted, 2 packets received, 0.0% packet loss',
                    'round-trip min/avg/max/stddev = 0.075/0.078/0.081/0.003 ms (I\'m right here)'
                ];
                break;
            default:
                responseLines = [`command not found: ${escapeHTML(cmd)}. Type '<span class="text-accent">help</span>' for available commands.`];
                break;
        }
        
        // Print output lines with delay
        await printLines(responseLines);
    };
    
    const escapeHTML = (text) => {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    };
    
    const printLines = async (lines) => {
        for (const lineContent of lines) {
            const line = document.createElement('div');
            line.className = 'output-line';
            line.innerHTML = lineContent;
            terminalOutput.appendChild(line);
            scrollTerminal();
            await new Promise(resolve => setTimeout(resolve, 35)); // Snappy stream delay
        }
        // Add a line break after output block
        const br = document.createElement('br');
        terminalOutput.appendChild(br);
        scrollTerminal();
    };
    
    const scrollTerminal = () => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };
    
    // Key event listener
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value;
            terminalInput.value = '';
            handleCommand(cmd);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = history[historyIndex];
                // Move caret to end
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                terminalInput.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                terminalInput.value = '';
            }
        }
    });
}

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
function initNavToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent scrolling of background when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

/* ==========================================================================
   Intersection Observer for Active Nav Links
   ========================================================================== */
function initScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Sweet spot viewport boundary
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}

import { useState } from 'react'
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const skills = [
  'Electrical circuits', 'Wiring + soldering', 'Microcontrollers', 'Arduino IDE',
  'C++', 'Electronics prototyping', 'Inverter circuitry', 'Energy measurement',
  'FPV drone hardware', 'Betaflight', 'INAV', '3D printing', 'MATLAB', 'LaTeX',
  'Python fundamentals', 'Power BI', 'Claude Code', 'Google Antigravity', 'ChatGPT / GPT',
  'Gemini', 'Ollama', 'LM Studio', 'ComfyUI', 'MiniMax H3', 'Higgsfield',
  'Premiere Pro', 'After Effects', 'Photoshop', 'Canva', 'Filmora',
  'Video editing', 'Motion graphics', 'Website planning', 'No-code design',
]

const projects = [
  { number: '01', title: 'Smart BMS for EV', type: 'Electrical systems / Mobility', text: 'A battery management concept for safer, smarter electric mobility—designed around sensing, protection and practical feedback loops.', tags: ['EV', 'BMS', 'Sensing'], tone: 'amber' },
  { number: '02', title: 'IoT Smart Energy Meter', type: 'IoT / Energy monitoring', text: 'A connected energy measurement system that turns raw consumption into clear, actionable visibility.', tags: ['IoT', 'Energy', 'Arduino'], tone: 'violet' },
  { number: '03', title: 'Inverter & Obstacle Avoidance Car', type: 'Embedded / Robotics', text: 'Power electronics and autonomous motion in one playful prototype—built to learn by making.', tags: ['Inverter', 'Robotics', 'Sensors'], tone: 'cyan' },
  { number: '04', title: 'Music-Reactive LED Strip', type: 'Creative electronics', text: 'A physical light experience that listens to sound and translates rhythm into color, movement and atmosphere.', tags: ['Audio', 'LED', 'Realtime'], tone: 'pink' },
  { number: '05', title: 'AI Companion App', type: 'AI-assisted application', text: 'Exploring local-first, personality-driven interfaces where useful software feels a little more human.', tags: ['AI', 'UX', 'Local-first'], tone: 'lime' },
  { number: '06', title: 'VTuber Streaming App', type: 'Creative technology', text: 'A playful production workflow combining virtual identity, live interaction and generative media.', tags: ['VTuber', 'Media', 'Realtime'], tone: 'orange' },
  { number: '07', title: 'Job Application Automator', type: 'Productivity / Automation', text: 'A practical AI workflow for reducing repetitive application work while keeping the human story intact.', tags: ['Agents', 'Automation', 'Web'], tone: 'blue' },
  { number: '08', title: 'ComfyUI Generative Media Pipelines', type: 'AI image + 3D generation', text: 'Node-based creative systems for exploring images, concepts and 3D worlds at the speed of thought.', tags: ['ComfyUI', '3D', 'Generative'], tone: 'purple' },
]

const experience = [
  { date: 'AUG 2026 — PRESENT', company: 'Preflight Labs LLP', role: 'Intern', description: 'Working at the intersection of technical systems, AI-assisted workflows and product experimentation.' },
  { date: 'DEC 2024 — JAN 2025', company: 'Rashtriya Chemicals & Fertilizers', role: 'Electrical Engineering Intern', description: 'Industrial exposure to electrical engineering practices, operations and the systems that keep a large plant moving.' },
  { date: 'DEC 2024 — JAN 2025', company: 'Space Root Education', role: 'Technical Collaborator', description: 'Collaborated on technical learning experiences and hands-on electronics education.' },
  { date: '2020 — PRESENT', company: 'Independent / Freelance', role: 'YouTube content creator + editor', description: 'Building stories through video, motion graphics and creative experimentation across platforms.' },
]

const certifications = [
  ['2026', 'Infosys — Cyber Security Overview and Introduction to Cyber Security'],
  ['2024', 'Infosys — Demystifying Generative AI for Leaders'],
  ['2024', 'LinkedIn Learning — Python Essential Training'],
  ['2024', 'LinkedIn Learning — Power BI'],
  ['2024', 'TCS iON — Basics of Customer Services and Inventory Management'],
  ['2023', 'Infosys — Young IoT Prodigy'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Gaurang Bhogle home">
          <span className="brand-mark">GB</span>
          <span>GAURANG<br /><em>BHOGLE</em></span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="nav-cta" href="mailto:gaurangbhogle1@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Electrical engineer / creative technologist</p>
            <h1>Building the<br /><span className="outline-text">unusual.</span></h1>
            <p className="hero-lede">I&apos;m Gaurang — an electrical engineering candidate exploring what happens when <strong>hardware, AI and imagination</strong> share the same workbench.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <MoveUpRight size={17} /></a>
              <a className="text-link" href="mailto:gaurangbhogle1@gmail.com">Start a conversation <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-photo-wrap">
              <img src="/gaurang-photo.jpg" alt="Portrait of Gaurang Parag Bhogle" className="hero-photo" />
              <div className="photo-caption"><span>01</span><span>Curious by default.</span></div>
            </div>
            <div className="hero-sticker"><Sparkles size={16} /> BUILD / BREAK / REPEAT</div>
            <span className="hero-coordinate">19°04&apos;N / 72°59&apos;E</span>
          </div>
          <div className="scroll-cue"><span /> Scroll to explore</div>
        </section>

        <section className="signal-band">
          <div className="signal-track">
            <span>Electrical engineering</span><i>✳</i><span>AI-assisted development</span><i>✳</i><span>Electronics</span><i>✳</i><span>Creative technology</span><i>✳</i><span>Electrical engineering</span>
          </div>
        </section>

        <section className="intro section-wrap" id="about">
          <div className="section-label"><span>001</span><span>THE SIGNAL</span></div>
          <div className="intro-grid">
            <h2>Where voltage<br />meets <em>vision.</em></h2>
            <div className="intro-copy">
              <p className="lead">I like understanding how things work—and then finding a more interesting way to make them work.</p>
              <p>My foundation is electrical engineering: circuits, microcontrollers, power, measurement and the stubborn joy of a prototype finally doing what it should. Alongside that, I&apos;ve been building with AI, local models and generative media.</p>
              <p>The through-line is curiosity. I&apos;m interested in tools that make the physical world more responsive, and the digital world more alive.</p>
              <a className="arrow-link" href="mailto:gaurangbhogle1@gmail.com">Get in touch <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-label"><span>002</span><span>SELECTED WORK</span><span className="section-count">08 experiments / ongoing</span></div>
          <div className="section-heading"><h2>Things I&apos;ve<br /><em>made.</em></h2><p>Prototypes, tools and creative systems—some polished, some gloriously in progress.</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.tone}`} key={project.number}>
                <div className="project-top"><span>{project.number}</span><ArrowUpRight size={18} /></div>
                <div className="project-art" aria-hidden="true"><div className="art-shape" /><div className="art-line" /><span className="art-label">SYSTEM / 0{project.number}</span></div>
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-text">{project.text}</p>
                <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-wrap" id="experience">
          <div className="section-label"><span>003</span><span>FIELD NOTES</span></div>
          <div className="section-heading"><h2>In the<br /><em>real world.</em></h2><p>Learning by stepping into different rooms, industries and problems.</p></div>
          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="experience-row" key={item.company}>
                <span className="experience-index">0{index + 1}</span><span className="experience-date">{item.date}</span>
                <div><h3>{item.company}</h3><p className="role">{item.role}</p><p className="experience-description">{item.description}</p></div>
                <ArrowUpRight className="experience-arrow" size={18} />
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section section-wrap">
          <div className="section-label"><span>004</span><span>THE TOOLKIT</span></div>
          <div className="skills-grid">
            <div><h2>Tools for<br /><em>the curious.</em></h2><p>From a soldering iron to a local language model, the right tool is the one that helps the idea become real.</p></div>
            <div className="skills-cloud">{skills.map((skill, i) => <span key={skill} className={i % 7 === 0 ? 'highlight' : ''}>{skill}</span>)}</div>
          </div>
        </section>

        <section className="education section-wrap">
          <div className="section-label"><span>005</span><span>FOUNDATIONS</span></div>
          <div className="education-grid">
            <div><p className="eyebrow">Education</p><h2>Learning in<br /><em>public.</em></h2></div>
            <div className="education-card"><span className="year">2022 — PRESENT</span><h3>B.E. Electrical Engineering</h3><p>Fr. Conceicao Rodrigues Institute of Technology, Vashi</p><div className="marks"><div><strong>5.8</strong><span>CGPA / 10</span></div><div><strong>51%</strong><span>HSC</span></div><div><strong>66%</strong><span>SSC</span></div></div></div>
          </div>
          <div className="cert-list"><p className="eyebrow">Certifications</p>{certifications.map(([year, cert]) => <div className="cert-row" key={cert}><span>{year}</span><span>{cert}</span><ArrowUpRight size={15} /></div>)}</div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-orb"><div className="orb-ring" /><div className="orb-core"><Zap size={28} /></div></div>
          <div className="contact-copy"><p className="eyebrow"><span className="status-dot" /> Currently open to interesting problems</p><h2>Have an idea<br />worth <em>building?</em></h2><a className="email-link" href="mailto:gaurangbhogle1@gmail.com">gaurangbhogle1@gmail.com <ArrowUpRight size={20} /></a></div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <div><a className="brand" href="#top"><span className="brand-mark">GB</span><span>GAURANG<br /><em>BHOGLE</em></span></a><p>Electrical engineering × AI × creative technology</p></div>
        <div className="footer-contact"><span>Vashi, Navi Mumbai / India</span><a href="tel:+918369120076">+91 83691 20076</a><div className="socials"><a href="https://linkedin.com/in/gaurang-bhogle" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:gaurangbhogle1@gmail.com" aria-label="Email"><Mail size={18} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 Gaurang Parag Bhogle</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  )
}

export default App

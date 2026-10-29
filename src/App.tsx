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
  Youtube,
} from 'lucide-react'

const skills = [
  'Electrical circuits', 'Wiring + soldering', 'Microcontrollers', 'Arduino IDE',
  'C++', 'Electronics prototyping', 'Inverter circuitry', 'Energy measurement',
  'FPV drone design + assembly', 'Betaflight', 'Cleanflight', 'INAV', 'Mission Planner', 'DJI software', '3D printing', 'MATLAB', 'LaTeX',
  'Python fundamentals', 'Power BI', 'Claude Code', 'Google Antigravity', 'ChatGPT / GPT',
  'Gemini', 'Ollama', 'LM Studio', 'ComfyUI', 'MiniMax H3', 'Higgsfield',
  'Premiere Pro', 'After Effects', 'Photoshop', 'Canva', 'Filmora',
  'Video editing', 'Motion graphics', 'Website planning', 'No-code design', 'Coding + debugging',
]

const projects = [
  { number: '01', title: 'Smart BMS for EV', type: 'Electrical systems / Mobility', text: 'An ongoing 3S4P 18650 NMC battery-management concept with Arduino control logic, MATLAB simulation and practical protection loops.', tags: ['EV', 'BMS', '3S4P'], tone: 'amber', visual: 'bms', caption: 'Cell monitoring / protection logic' },
  { number: '02', title: 'IoT Smart Energy Meter', type: 'IoT / Energy monitoring', text: 'A measurement system for voltage, current and RMS readings. The single-phase prototype delivered accurate readings while the three-phase iteration became a useful learning loop.', tags: ['IoT', 'Energy', 'Arduino'], tone: 'violet', visual: 'meter', caption: 'Voltage + current visibility', href: 'https://github.com/soulofswords/iot-smart-meter' },
  { number: '03', title: 'Half-Bridge Inverter', type: 'Power electronics', text: 'A hands-on inverter study focused on switching, conversion and the practical discipline of documenting a power-electronics prototype.', tags: ['Inverter', 'Power', 'Switching'], tone: 'cyan', caption: 'DC / AC conversion', href: 'https://github.com/soulofswords/inverter-half-bridge' },
  { number: '04', title: 'Obstacle Avoidance Car', type: 'Embedded / Robotics', text: 'An autonomous motion prototype using sensors and control logic to detect obstacles and choose a path forward.', tags: ['Robotics', 'Sensors', 'Arduino'], tone: 'cyan', visual: 'robot', caption: 'Sense / decide / move', href: 'https://github.com/soulofswords/obstacle-avoidance-robot' },
  { number: '05', title: 'Music-Reactive LED Strip', type: 'Creative electronics', text: 'A physical light experience that listens to sound and translates rhythm into color, movement and atmosphere.', tags: ['Audio', 'LED', 'Realtime'], tone: 'pink', visual: 'led', caption: 'Sound into light', href: 'https://github.com/soulofswords/music-reactive-led' },
  { number: '06', title: 'AI Companion App', type: 'AI-assisted application', text: 'Exploring local-first, personality-driven interfaces where useful software feels a little more human.', tags: ['AI', 'UX', 'Local-first'], tone: 'lime', visual: 'ai', caption: 'Interface / context / response' },
  { number: '07', title: 'VTuber Streaming App', type: 'Creative technology', text: 'A playful production workflow combining virtual identity, live interaction and generative media.', tags: ['VTuber', 'Media', 'Realtime'], tone: 'orange', visual: 'vtuber', caption: 'Avatar / stream / audience' },
  { number: '08', title: 'Job Application Automator', type: 'Productivity / Automation', text: 'A practical AI workflow for reducing repetitive application work while keeping the human story intact.', tags: ['Agents', 'Automation', 'Web'], tone: 'blue', visual: 'job', caption: 'Find / match / apply' },
  { number: '09', title: 'ComfyUI Generative Media Pipelines', type: 'AI image + 3D generation', text: 'Node-based creative systems for exploring images, concepts and 3D worlds at the speed of thought.', tags: ['ComfyUI', '3D', 'Generative'], tone: 'purple', visual: 'comfy', caption: 'Nodes / images / worlds' },
  { number: '10', title: 'FPV Drone Builds', type: 'UAV / Flight systems', text: 'Three years of hands-on building across 3.5-inch cinewhoops, 5-inch digital rigs and 7-inch long-range platforms—covering assembly, tuning, camera integration and repair.', tags: ['FPV', 'Betaflight', 'iNav'], tone: 'orange', visual: 'drone', caption: 'Build / tune / fly / repair' },
  { number: '11', title: 'Early Electronics Lab', type: 'Long-running maker practice', text: 'A trail of practical builds from table fans, door alarms and emergency lights to speakers, Arduino visualizers, drones and an e-bike.', tags: ['Making', 'Arduino', 'Prototyping'], tone: 'blue' },
]

const experience = [
  { date: 'AUG 2026 — PRESENT', company: 'Preflight Labs LLP', role: 'Intern', description: 'Working at the intersection of technical systems, AI-assisted workflows and product experimentation.' },
  { date: '2022 — PRESENT', company: 'Independent FPV Drone Builder', role: 'Self-directed UAV practice', description: 'Built, tested and customized 3.5-inch, 5-inch and 7-inch FPV drones; tuned Betaflight, Cleanflight and iNav builds, integrated cameras, prototyped mounts on a 3D printer, and helped peers troubleshoot repairs.' },
  { date: '17 DEC 2024 — 04 JAN 2025', company: 'Rashtriya Chemicals & Fertilizers', role: 'Electrical Engineering Intern · A.N. Melt Plant', description: 'Completed 15 training days studying process, electrical equipment and electrical maintenance activities at RCF’s A.N. Melt Plant in Mumbai.' },
  { date: 'DEC 2024 — JAN 2025', company: 'Space Root Education', role: 'Technical Collaborator', description: 'Supported Betaflight configuration, component selection and troubleshooting for a 7-inch long-range build and peer drone projects.' },
  { date: '2020 — PRESENT', company: 'Independent / Freelance', role: 'YouTube content creator + editor', description: 'Video and photo editing across Filmora, After Effects, Premiere Pro, Photoshop and Canva—from scripting and voiceovers to motion graphics, thumbnails and audience engagement.' },
]

const certifications = [
  ['11 JUL 2026', 'Infosys — Introduction to Cyber Security'],
  ['11 JUL 2026', 'Infosys — Cyber Security Overview'],
  ['30 JUN 2024', 'Infosys — Demystifying Generative AI for Leaders'],
  ['18 SEP 2024', 'LinkedIn Learning — Python Essential Training'],
  ['12 SEP 2024', 'LinkedIn Learning — Getting Started with Power BI'],
  ['13 SEP 2024', 'LinkedIn Learning — Canva Essential Training'],
  ['04 JUL 2024', 'LinkedIn Learning — How to Plan Your Website'],
  ['04 JUL 2024', 'LinkedIn Learning — Introduction to Web Design and Development'],
  ['04 JUL 2024', 'LinkedIn Learning — Getting Started as a Full-Stack Web Developer'],
  ['06 JUL 2024', 'LinkedIn Learning — No-Code Web Design'],
  ['01 JUL 2024', 'TCS iON — Basics of Customer Services'],
  ['30 JUN 2024', 'TCS iON — Basics of Inventory Management'],
  ['22 DEC 2023', 'Infosys — Young IoT Prodigy'],
]

const storyMilestones = [
  { year: '8TH STANDARD', title: 'The first solder joints', text: 'Curiosity became hands-on when I started opening up circuits, learning to solder, and making small devices work: a portable fan, speaker, cooler and emergency light.' },
  { year: '10TH STANDARD', title: 'Learning from an E-bike', text: 'A home-built E-bike with roughly 20 km of range introduced me to Li-ion cells, battery management and the difference between an idea and a system that has to survive real use.' },
  { year: '12TH STANDARD', title: 'The first FPV pull', text: 'I sourced parts through AliExpress and Robu.in to build an analog FPV drone. That first flight opened a longer path through assembly, tuning, repair and flight systems.' },
  { year: 'MAKING THROUGH SETBACKS', title: 'Self-directed by necessity', text: 'Academic setbacks did not end the making. They made the learning more self-directed: documentation, experiments, debugging and returning to the bench became the reliable rhythm.' },
  { year: 'CREATIVE SYSTEMS', title: 'From Wondershare to motion/VFX', text: 'Video editing grew from Wondershare into Premiere Pro, After Effects, Photoshop and Media Encoder, with experiments in 3D text, Saber, matte tracking, Boris and motion-led storytelling.' },
  { year: 'THE WIDER TOOLKIT', title: '3D, games and communities', text: 'I explored Blender, Maya, VRoid and Unity assets, attended a VJTI aero workshop, followed the Aero Club, joined GDSC, prototyped games in Unity and continued learning Unreal.' },
  { year: 'BUILDING WITH OTHERS', title: 'Projects, teams and early collaborations', text: 'The path included the inverter and obstacle-avoidance car, the PZEM + ESP32 smart meter, Vanilla Kart’s WordPress/news-site work, and an early Soul.ai collaboration that did not continue.' },
  { year: 'NOW', title: 'Flight systems and applied work', text: 'FPV freelance builds and troubleshooting led through Bharat, Space Root Education, Cortex Flight System and the IIT Indore/incubation context. Today at Preflight Labs LLP, I build projects for the army.' },
]

const profilePhotoUrl = `${import.meta.env.BASE_URL}gaurang-photo.png`

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
              <img src={profilePhotoUrl} alt="Portrait of Gaurang Parag Bhogle" className="hero-photo" />
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
              <p>My foundation is electrical engineering: circuits, microcontrollers, power, measurement and the stubborn joy of a prototype finally doing what it should. For the last three years, that curiosity has also taken me into FPV drone design, tuning and flight.</p>
              <p>The through-line is curiosity. I&apos;m interested in tools that make the physical world more responsive, and the digital world more alive.</p>
              <a className="arrow-link" href="mailto:gaurangbhogle1@gmail.com">Get in touch <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="biography section-wrap" id="story">
          <div className="section-label"><span>002</span><span>THE STORY</span><span className="section-count">A maker&apos;s timeline</span></div>
          <div className="biography-intro">
            <div><p className="eyebrow">Biography</p><h2>Built by<br /><em>curiosity.</em></h2></div>
            <div className="biography-lede">
              <p className="lead">I did not start with a perfect roadmap. I started by soldering things together and asking what would happen if I tried one more version.</p>
              <p>From small electronics and an E-bike to FPV drones, motion graphics, game prototypes and AI-assisted tools, my work has grown through a mix of fascination, setbacks and persistence. The common thread is practical learning: understand the system, make a first version, test it honestly, and keep the useful parts.</p>
              <a className="arrow-link" href="https://www.instagram.com/satlok_soul_serinity/" target="_blank" rel="noreferrer">See creative work on Instagram <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="story-grid">
            {storyMilestones.map((item, index) => (
              <article className="story-card" key={item.title}>
                <span className="story-number">0{index + 1}</span>
                <span className="story-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-label"><span>003</span><span>SELECTED WORK</span><span className="section-count">11 experiments / ongoing</span></div>
          <div className="section-heading"><h2>Things I&apos;ve<br /><em>made.</em></h2><p>Prototypes, tools and creative systems—some polished, some gloriously in progress.</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.tone}`} key={project.number}>
                <div className="project-top"><span>{project.number}</span>{project.href ? <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}><ArrowUpRight size={18} /></a> : <ArrowUpRight size={18} />}</div>
                <div className={`project-art ${project.visual ? 'has-thumbnail' : ''}`} aria-hidden="true">
                  {project.visual ? <img className="project-thumbnail" src={`${import.meta.env.BASE_URL}project-${project.visual}.svg`} alt="" /> : <><div className="art-shape" /><div className="art-line" /></>}
                  <span className="art-label">{project.caption ?? `SYSTEM / 0${project.number}`}</span>
                </div>
                <p className="project-type">{project.type}</p>
                <h3>{project.href ? <a className="project-title-link" href={project.href} target="_blank" rel="noreferrer">{project.title}</a> : project.title}</h3>
                <p className="project-text">{project.text}</p>
                <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-wrap" id="experience">
          <div className="section-label"><span>004</span><span>FIELD NOTES</span></div>
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
          <div className="section-label"><span>005</span><span>THE TOOLKIT</span></div>
          <div className="skills-grid">
            <div><h2>Tools for<br /><em>the curious.</em></h2><p>From a soldering iron to a local language model, the right tool is the one that helps the idea become real. The archive starts with small electronics builds in 2016 and keeps expanding through drones, code and visual storytelling.</p></div>
            <div className="skills-cloud">{skills.map((skill, i) => <span key={skill} className={i % 7 === 0 ? 'highlight' : ''}>{skill}</span>)}</div>
          </div>
        </section>

        <section className="education section-wrap">
          <div className="section-label"><span>006</span><span>FOUNDATIONS</span></div>
          <div className="education-grid">
            <div><p className="eyebrow">Education</p><h2>Learning in<br /><em>public.</em></h2></div>
            <div className="education-card"><span className="year">2022 — PRESENT</span><h3>B.E. Electrical Engineering</h3><p>Fr. Conceicao Rodrigues Institute of Technology, Vashi</p><p className="education-history">Science: SS High School &amp; Junior College, Seawoods (2020 — 2022)<br />School: DAV Public School, Airoli (2010 — 2020)</p><div className="marks"><div><strong>5.8</strong><span>CGPA / 10</span></div><div><strong>51%</strong><span>HSC</span></div><div><strong>66%</strong><span>SSC</span></div></div></div>
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
        <div className="footer-contact"><span>Vashi, Navi Mumbai / India</span><a href="tel:+918369120076">+91 83691 20076</a><div className="socials"><a href="https://linkedin.com/in/gaurang-bhogle" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a><a href="https://www.instagram.com/satlok_soul_serinity/" target="_blank" rel="noreferrer" aria-label="Instagram creative portfolio">Instagram</a><a href="mailto:gaurangbhogle1@gmail.com" aria-label="Email"><Mail size={18} /></a></div><div className="channel-links"><span>Watch / follow</span><a href="https://www.youtube.com/@soulofswords" target="_blank" rel="noreferrer" aria-label="Gaming YouTube channel"><Youtube size={16} /> Gaming</a><a href="https://www.youtube.com/@fpvninjamumbai" target="_blank" rel="noreferrer" aria-label="Drone and FPV YouTube channel"><Youtube size={16} /> Drone / FPV</a></div></div>
        <div className="footer-bottom"><span>© 2026 Gaurang Parag Bhogle</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  )
}

export default App

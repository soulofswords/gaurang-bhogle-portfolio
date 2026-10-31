import { useState, useEffect, useContext } from 'react'
import ThemeContext from './ThemeContext'
import {
  ArrowRight,
  ArrowUpRight,
  CircuitBoard,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  Wrench,
  X,
  Youtube,
} from 'lucide-react'

const sakuraUrl = 'https://soulofswords.github.io/Sakura-website/'

type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  image?: string
  imageAlt?: string
  href?: string
  linkLabel?: string
  status?: string
}

const featuredProjects: Project[] = [
  {
    title: 'Sakura Companion',
    category: 'Desktop AI product',
    description: 'A Windows character companion combining local or cloud AI, memory, voice, approved Agent workflows and optional webcam tracking in one creator-focused application.',
    tags: ['Python', 'Local AI', 'Product design', 'Desktop'],
    image: 'project-ai.svg',
    imageAlt: 'Diagram of the context and response loop in Sakura Companion',
    href: sakuraUrl,
    linkLabel: 'View product and downloads',
    status: 'Released',
  },
  {
    title: 'Sakura VTuber',
    category: 'Creator and streaming tool',
    description: 'A standalone VTuber workflow with face and hand tracking, model controls, RVC voice conversion, Spout and virtual-camera output for live production.',
    tags: ['Computer vision', 'Realtime', 'Streaming', 'UX'],
    image: 'project-vtuber.svg',
    imageAlt: 'Diagram of the avatar and live-stream workflow in Sakura VTuber',
    href: sakuraUrl,
    linkLabel: 'View product and downloads',
    status: 'Released',
  },
]

const selectedProjects: Project[] = [
  {
    title: 'Smart BMS for EV',
    category: 'Battery systems',
    description: 'An ongoing 3S4P 18650 NMC battery-management prototype covering cell monitoring, protection logic, Arduino control and MATLAB simulation.',
    tags: ['BMS', 'Arduino', 'MATLAB'],
    image: 'project-bms.svg',
    imageAlt: 'Battery cells connected to monitoring and protection logic',
    status: 'In development',
  },
  {
    title: 'IoT Smart Energy Meter',
    category: 'Energy monitoring',
    description: 'A connected meter for voltage, current and RMS measurement. The single-phase prototype produced reliable readings and informed a three-phase iteration.',
    tags: ['ESP32', 'PZEM', 'IoT'],
    image: 'project-meter.svg',
    imageAlt: 'Energy meter dashboard showing live electrical readings',
    href: 'https://github.com/soulofswords/iot-smart-meter',
    linkLabel: 'View repository',
  },
  {
    title: 'FPV Drone Platforms',
    category: 'UAV systems',
    description: 'Three years of assembling, tuning and repairing 3.5-inch cinewhoops, 5-inch digital builds and 7-inch long-range platforms.',
    tags: ['Betaflight', 'iNav', 'Fabrication'],
    image: 'project-drone.svg',
    imageAlt: 'Technical diagram of an FPV quadcopter and flight data',
    status: 'Ongoing practice',
  },
  {
    title: 'Half-Bridge Inverter',
    category: 'Power electronics',
    description: 'A practical study of switching and DC-to-AC conversion, developed to strengthen power-stage assembly, testing and technical documentation.',
    tags: ['Inverter', 'Switching', 'Power'],
    href: 'https://github.com/soulofswords/inverter-half-bridge',
    linkLabel: 'View repository',
  },
  {
    title: 'Obstacle Avoidance Car',
    category: 'Embedded robotics',
    description: 'An autonomous vehicle prototype using distance sensing and embedded control logic to detect obstacles and select a clear path.',
    tags: ['Arduino', 'Sensors', 'Robotics'],
    image: 'project-robot.svg',
    imageAlt: 'Obstacle-avoidance robot sensing objects in its path',
    href: 'https://github.com/soulofswords/obstacle-avoidance-robot',
    linkLabel: 'View repository',
  },
  {
    title: 'Music-Reactive LED Strip',
    category: 'Creative electronics',
    description: 'A realtime lighting prototype that maps incoming audio energy to colour and motion for responsive ambient installations.',
    tags: ['Audio', 'LED', 'Realtime'],
    image: 'project-led.svg',
    imageAlt: 'Audio waveform driving a colour-changing LED strip',
    href: 'https://github.com/soulofswords/music-reactive-led',
    linkLabel: 'View repository',
  },
]

const additionalWork = [
  ['Job Application Automator', 'Agent-assisted research and repetitive workflow automation.'],
  ['ComfyUI Media Pipelines', 'Node-based image, concept and 3D generation workflows.'],
  ['Early Electronics Lab', 'Fans, alarms, emergency lights, speakers, visualizers and an E-bike.'],
]

const experience = [
  {
    date: 'Aug 2026 — Present',
    company: 'Preflight Labs LLP',
    role: 'Engineering Intern',
    description: 'Supporting technical systems, AI-assisted development and product experimentation in an applied engineering environment.',
  },
  {
    date: '2022 — Present',
    company: 'Independent FPV Drone Builder',
    role: 'UAV design, assembly and troubleshooting',
    description: 'Build, tune and repair FPV platforms; integrate cameras and flight hardware; prototype mounts; and help peers diagnose hardware and configuration issues.',
  },
  {
    date: 'Dec 2024 — Jan 2025',
    company: 'Rashtriya Chemicals & Fertilizers',
    role: 'Electrical Engineering Intern · A.N. Melt Plant',
    description: 'Completed 15 days of industrial training focused on plant processes, electrical equipment and maintenance practices.',
  },
  {
    date: 'Dec 2024 — Jan 2025',
    company: 'Space Root Education',
    role: 'Technical Collaborator',
    description: 'Supported component selection, Betaflight setup and troubleshooting for a 7-inch long-range drone and related student builds.',
  },
  {
    date: '2020 — Present',
    company: 'Independent / Freelance',
    role: 'Video creator and editor',
    description: 'Produce videos from scripting and voiceover through editing, motion graphics, thumbnails and publishing.',
  },
]

const capabilities = [
  {
    number: '01',
    title: 'Electrical & power',
    items: ['Circuit prototyping', 'Wiring and soldering', 'Battery systems', 'Power electronics', 'Energy measurement'],
  },
  {
    number: '02',
    title: 'Embedded & flight',
    items: ['Arduino and C++', 'Microcontrollers', 'Betaflight', 'iNav and Mission Planner', 'FPV assembly and tuning'],
  },
  {
    number: '03',
    title: 'Software & AI',
    items: ['Python fundamentals', 'AI-assisted development', 'Local language models', 'Automation workflows', 'Testing and debugging'],
  },
  {
    number: '04',
    title: 'Design & production',
    items: ['3D printing', 'Premiere Pro', 'After Effects', 'Photoshop', 'Motion graphics'],
  },
]

const certifications = [
  ['2026', 'Infosys — Introduction to Cyber Security'],
  ['2024', 'Infosys — Demystifying Generative AI for Leaders'],
  ['2024', 'LinkedIn Learning — Python Essential Training'],
  ['2024', 'LinkedIn Learning — Getting Started with Power BI'],
  ['2023', 'Infosys — Young IoT Prodigy'],
]

const profilePhotoUrl = `${import.meta.env.BASE_URL}gaurang-photo.jpg`

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <>
      <div className="project-card-top">
        <span>{String(index + 1).padStart(2, '0')}</span>
        {project.href ? <ArrowUpRight size={18} aria-hidden="true" /> : <CircuitBoard size={18} aria-hidden="true" />}
      </div>
      {project.image ? (
        <div className="project-image-wrap">
          <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.imageAlt ?? ''} />
        </div>
      ) : (
        <div className="project-placeholder" aria-hidden="true"><CircuitBoard size={42} /></div>
      )}
      <p className="project-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="project-card-footer">
        <span>{project.linkLabel ?? project.status}</span>
        {project.href && <ArrowRight size={16} aria-hidden="true" />}
      </div>
    </>
  )

  if (project.href) {
    return <a className="project-card" href={project.href} target="_blank" rel="noreferrer">{content}</a>
  }

  return <article className="project-card">{content}</article>
}

function useScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal')
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active')
        }
      }
    }
    window.addEventListener('scroll', reveal)
    reveal() // Initial check
    return () => window.removeEventListener('scroll', reveal)
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const themeCtx = useContext(ThemeContext)
  const closeMenu = () => setMenuOpen(false)
  
  useScrollReveal()

  if (!themeCtx) return null
  const { theme, toggleTheme } = themeCtx

  return (
    <div className="site-shell">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-mark">GB</span>
            <span className="brand-copy"><strong>Gaurang Bhogle</strong><small>Electrical Engineering</small></span>
          </a>

          <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <div className="header-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <a className="header-contact" href="mailto:gaurangbhogle1@gmail.com">Get in touch <ArrowUpRight size={15} /></a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero page-width reveal" id="top">
          <div className="hero-content">
            <p className="overline"><span /> Electrical engineering · Embedded systems · Applied AI</p>
            <h1>Building reliable systems from <em>circuit</em> to interface.</h1>
            <p className="hero-summary">I&apos;m Gaurang Bhogle, an electrical engineering candidate focused on practical hardware, FPV platforms and software tools for creators. I turn early concepts into working, testable prototypes.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View selected work <ArrowRight size={17} /></a>
              <a className="button button-secondary" href="mailto:gaurangbhogle1@gmail.com">Email me</a>
            </div>
            <dl className="hero-details">
              <div><dt>Current</dt><dd>Engineering Intern · Preflight Labs LLP</dd></div>
              <div><dt>Based in</dt><dd>Navi Mumbai, India</dd></div>
            </dl>
          </div>

          <div className="portrait-panel reveal">
            <div className="portrait-frame"><img src={profilePhotoUrl} alt="Gaurang Bhogle wearing a dark suit" /></div>
            <div className="portrait-caption"><span>Electrical engineering</span><span>Creator</span><span>Builder</span></div>
          </div>
        </section>

        <section className="focus-strip" aria-label="Areas of focus">
          <div className="page-width focus-strip-inner">
            <span>Power electronics</span><i />
            <span>Embedded systems</span><i />
            <span>FPV &amp; UAV platforms</span><i />
            <span>AI products</span><i />
            <span>Creative technology</span>
          </div>
        </section>

        <section className="section page-width reveal" id="projects">
          <div className="section-intro">
            <div><p className="section-kicker">Selected work</p><h2>Projects built to solve, test and learn.</h2></div>
            <p>A focused selection across desktop software, electrical systems, embedded hardware and flight platforms.</p>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <a className="featured-project" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <div className="featured-project-content">
                  <div className="featured-meta"><span>{project.category}</span><span className="status-badge">{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="featured-link">{project.linkLabel} <ArrowUpRight size={17} /></span>
                </div>
                <div className="featured-visual reveal"><img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.imageAlt} /></div>
              </a>
            ))}
          </div>

          <div className="project-grid reveal">
            {selectedProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
          </div>

          <div className="additional-work reveal">
            <div><p className="section-kicker">Additional explorations</p><p>Smaller tools and formative builds that expanded the toolkit.</p></div>
            <div className="additional-list">
              {additionalWork.map(([title, description], index) => (
                <div className="additional-item" key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{description}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tinted reveal" id="experience">
          <div className="page-width">
            <div className="section-intro">
              <div><p className="section-kicker">Experience</p><h2>Applied learning in real environments.</h2></div>
              <p>Hands-on work across engineering, UAV systems, industrial operations and digital production.</p>
            </div>
            <div className="experience-list">
              {experience.map((item, index) => (
                <article className="experience-item" key={`${item.company}-${item.date}`}>
                  <span className="experience-number">0{index + 1}</span>
                  <p className="experience-date">{item.date}</p>
                  <div className="experience-main"><h3>{item.company}</h3><p className="experience-role">{item.role}</p><p>{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section page-width reveal" id="about">
          <div className="about-grid">
            <div className="about-heading">
              <p className="section-kicker">About</p>
              <h2>Curious about how systems work. Disciplined about making them work.</h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">My route into engineering started with taking apart everyday electronics, learning to solder and building small devices. That practical habit now shapes how I approach larger systems.</p>
              <p>I work comfortably between hardware and software: assembling a circuit, tuning a flight controller, testing a measurement path, debugging an application or documenting what changed between versions.</p>
              <p>I am currently completing a B.E. in Electrical Engineering while expanding my experience through internships, independent FPV work and product development.</p>
            </div>
          </div>

          <div className="capability-grid reveal">
            {capabilities.map((group) => (
              <article className="capability-card" key={group.title}>
                <span className="capability-number">{group.number}</span>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section reveal">
          <div className="page-width education-grid">
            <div className="education-summary">
              <p className="section-kicker">Education</p>
              <h2>B.E. Electrical Engineering</h2>
              <p className="institution">Fr. Conceicao Rodrigues Institute of Technology, Vashi</p>
              <div className="education-meta"><span>2022 — Present</span><span>Navi Mumbai</span></div>
            </div>
            <div className="certifications">
              <div className="certification-heading"><h3>Selected certifications</h3><Wrench size={20} aria-hidden="true" /></div>
              {certifications.map(([year, title]) => <div className="certification-row" key={title}><span>{year}</span><p>{title}</p></div>)}
            </div>
          </div>
        </section>

        <section className="contact-section reveal" id="contact">
          <div className="page-width contact-grid">
            <div><p className="section-kicker section-kicker-light">Contact</p><h2>Let&apos;s build something useful.</h2></div>
            <div className="contact-content">
              <p>I&apos;m open to engineering opportunities, product collaborations and technically ambitious projects.</p>
              <a className="contact-email" href="mailto:gaurangbhogle1@gmail.com">gaurangbhogle1@gmail.com <ArrowUpRight size={20} /></a>
              <div className="contact-location"><MapPin size={16} /> Vashi, Navi Mumbai, India</div>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <div className="page-width footer-grid">
            <div className="footer-top">
              <div><a className="brand footer-brand" href="#top"><span className="brand-mark">GB</span><span className="brand-copy"><strong>Gaurang Bhogle</strong><small>Electrical Engineering</small></span></a></div>
              <div className="footer-links">
                <a href="https://github.com/soulofswords" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                <a href="https://linkedin.com/in/gaurang-bhogle" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
                <a href="https://www.youtube.com/@fpvninjamumbai" target="_blank" rel="noreferrer"><Youtube size={17} /> FPV channel</a>
                <a href="mailto:gaurangbhogle1@gmail.com"><Mail size={17} /> Email</a>
              </div>
            </div>
            <div className="footer-bottom"><span>© 2026 Gaurang Parag Bhogle</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App

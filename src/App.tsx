import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircuitBoard,
  Copy,
  Github,
  Linkedin,
  Menu,
  Moon,
  Pause,
  Play,
  Plus,
  Radio,
  Sun,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import ThemeContext from "./ThemeContext";
import {
  additionalWork,
  capabilities,
  certifications,
  experience,
  featuredProjects,
  selectedProjects,
  type Project,
} from "./data";
import { ProjectVisual } from "./ProjectVisual";

const Sculpture = lazy(() => import("./Sculpture"));
const projects = [
  featuredProjects[0],
  featuredProjects[1],
  selectedProjects[2],
  selectedProjects[0],
  ...selectedProjects.filter((_, i) => i !== 0 && i !== 2),
];
const email = "gaurangbhogle1@gmail.com";
const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease }}
    >
      {children}
    </motion.div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="icon-button dialog-close"
          aria-label="Close project details"
          onClick={onClose}
          autoFocus
        >
          <X />
        </button>
        <span className="eyebrow">Project notes / {project.category}</span>
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-description">{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="dialog-visual">
          <ProjectVisual project={project} />
        </div>
        <div className="dialog-bottom">
          <span className="eyebrow">
            {project.status || "Engineering exploration"}
          </span>
          {project.href ? (
            <a
              className="button accent-button"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.linkLabel} <ArrowUpRight size={18} />
            </a>
          ) : (
            <a
              className="text-link"
              href={`mailto:${email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}
            >
              Ask me about this project <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

function App() {
  const theme = useContext(ThemeContext)!;
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const motionOff = Boolean(reducedMotion || paused);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [expanded, setExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const filteredProjects = projects.filter(
    (project) =>
      filter === "All work" ||
      (filter === "AI & Software"
        ? featuredProjects.includes(project)
        : selectedProjects.includes(project)),
  );
  const visibleProjects =
    expanded || filter !== "All work"
      ? filteredProjects
      : filteredProjects.slice(0, 4);

  useEffect(() => {
    document.documentElement.dataset.motion = motionOff ? "off" : "on";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motionOff]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      clearTimeout(copyTimer.current);
    };
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <MotionConfig reducedMotion={motionOff ? "always" : "user"}>
      <div className="site-shell">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <motion.div className="reading-progress" style={{ scaleX }} />
        <header className="site-header">
          <a
            className="brand"
            href="#top"
            onClick={() => setMenuOpen(false)}
            aria-label="Gaurang Bhogle, home"
          >
            <span className="brand-symbol">
              g<span>↗</span>
            </span>
            <span>
              GAURANG
              <br />
              BHOGLE<span className="brand-period">.</span>
            </span>
          </a>
          <nav
            id="main-nav"
            className={`site-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            {[
              ["Work", "projects"],
              ["About", "about"],
              ["Experience", "experience"],
            ].map(([label, id], i) => (
              <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>
                <sup>0{i + 1}</sup>
                {label}
              </a>
            ))}
            <a
              className="mobile-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let's talk <ArrowUpRight size={15} />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={theme.toggleTheme}
              aria-label={`Switch to ${theme.theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme.theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="header-contact" href="#contact">
              Let's talk <ArrowUpRight size={16} />
            </a>
            <button
              className="icon-button menu-button"
              aria-controls="main-nav"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        <main id="main-content">
          <section id="top" className="hero page-width">
            <div className="hero-topline">
              <span className="eyebrow">
                <span className="status-dot" /> An engineer. A maker. A work in
                progress.
              </span>
              <span className="eyebrow hero-location">
                Navi Mumbai, IN <span className="tiny-cross">+</span>
              </span>
            </div>
            <div className="hero-layout">
              <div className="hero-copy">
                <motion.p
                  className="hero-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Hi, I'm Gaurang.
                </motion.p>
                <h1>
                  <span className="headline-line">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, ease }}
                    >
                      Wired to
                    </motion.span>
                  </span>
                  <span className="headline-line">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, delay: 0.1, ease }}
                    >
                      build<span className="accent">.</span>
                    </motion.span>
                  </span>
                  <span className="headline-line outline-line">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, delay: 0.2, ease }}
                    >
                      Beyond.
                    </motion.span>
                  </span>
                </h1>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="hero-summary">
                    From circuits that think to ideas that fly.
                    <br />I connect{" "}
                    <strong>engineering, AI & creativity</strong>
                    <br className="desktop-break" /> to make things that work in
                    the real world.
                  </p>
                  <a className="button accent-button" href="#projects">
                    Explore my work <ArrowDown size={18} />
                  </a>
                </motion.div>
              </div>
              <div className="hero-art">
                <div className="art-grid" aria-hidden="true" />
                <div className="art-orbit orbit-one" aria-hidden="true" />
                <div className="art-orbit orbit-two" aria-hidden="true" />
                <span className="art-coordinate eyebrow">
                  FIG. 01 — THE POSSIBILITY LOOP
                </span>
                <Suspense
                  fallback={
                    <div className="sculpture-fallback" aria-hidden="true" />
                  }
                >
                  <Sculpture paused={motionOff} />
                </Suspense>
                <span className="art-axis axis-top" aria-hidden="true">
                  +
                </span>
                <span className="art-axis axis-bottom" aria-hidden="true">
                  +
                </span>
                <div className="art-label label-hardware">
                  <span />
                  HARDWARE
                </div>
                <div className="art-label label-software">
                  <span />
                  SOFTWARE
                </div>
                <div className="art-label label-imagination">
                  <span />
                  IMAGINATION
                </div>
                <div className="art-caption">
                  <span className="eyebrow">
                    Different disciplines.
                    <br />
                    One endless curiosity.
                  </span>
                  <span className="art-caption-arrow">↗</span>
                </div>
              </div>
            </div>
            <div className="hero-bottom">
              <a href="#projects" className="scroll-cue">
                <span>
                  <ArrowDown size={16} />
                </span>
                SCROLL TO EXPLORE
              </a>
              <span className="hero-current">
                <span className="status-dot" /> Currently building at{" "}
                <strong>Preflight Labs LLP</strong>
              </span>
              <button
                className="motion-control"
                disabled={Boolean(reducedMotion)}
                aria-pressed={!motionOff}
                onClick={() => setPaused(!paused)}
                aria-label={
                  reducedMotion
                    ? "Reduced motion enabled by your system"
                    : motionOff
                      ? "Enable motion"
                      : "Pause motion"
                }
              >
                {motionOff ? <Play size={12} /> : <Pause size={12} />}
                {motionOff ? "MOTION OFF" : "MOTION ON"}
              </button>
            </div>
          </section>

          <div
            className="marquee"
            aria-label="Electrical engineering, applied AI, FPV and UAV, creative technology"
          >
            <div className="marquee-track" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <div className="marquee-group" key={i}>
                  <span>ELECTRICAL ENGINEERING</span>
                  <i>✳</i>
                  <span className="marquee-outline">APPLIED AI</span>
                  <i>✳</i>
                  <span>FPV & UAV</span>
                  <i>✳</i>
                  <span className="marquee-outline">CREATIVE TECHNOLOGY</span>
                  <i>✳</i>
                </div>
              ))}
            </div>
          </div>

          <section id="projects" className="section page-width work-section">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow section-kicker">
                  <span>01 /</span> SELECTED WORK
                </p>
                <h2>
                  Ideas off the page.
                  <br />
                  <span className="muted">Into the world.</span>
                </h2>
              </div>
              <p className="section-note">
                A little code. A little solder.
                <br />A lot of figuring things out.
              </p>
            </Reveal>
            <div className="work-toolbar">
              <div className="filters" aria-label="Filter projects">
                {["All work", "AI & Software", "Hardware & Flight"].map(
                  (item) => (
                    <button
                      key={item}
                      aria-pressed={filter === item}
                      className={filter === item ? "active" : ""}
                      onClick={() => {
                        setFilter(item);
                        setExpanded(false);
                      }}
                    >
                      {item}
                      <span>
                        {item === "All work"
                          ? "08"
                          : item === "AI & Software"
                            ? "02"
                            : "06"}
                      </span>
                    </button>
                  ),
                )}
              </div>
              <span className="eyebrow project-count" aria-live="polite">
                {String(visibleProjects.length).padStart(2, "0")} PROJECTS IN
                VIEW
              </span>
            </div>
            <motion.div className="project-grid" layout={!motionOff}>
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.article
                    className="project-card"
                    key={project.title}
                    layout={!motionOff}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: motionOff ? 0 : 0.35, ease }}
                  >
                    <button
                      className="project-open"
                      onClick={() => setActiveProject(project)}
                      aria-label={`Explore ${project.title}`}
                    >
                      <div className="project-visual">
                        <ProjectVisual project={project} />
                        <span className="project-index eyebrow">
                          {String(projects.indexOf(project) + 1).padStart(
                            2,
                            "0",
                          )}{" "}
                          / {project.category}
                        </span>
                        <span className="project-view">
                          <ArrowUpRight size={24} />
                        </span>
                        <span className="visual-caption">
                          {featuredProjects.includes(project)
                            ? "PRODUCT CONCEPT VISUAL"
                            : "ENGINEERING STUDY"}
                        </span>
                      </div>
                      <div className="project-meta">
                        <div>
                          <p className="eyebrow">
                            {project.tags.slice(0, 3).join(" / ")}
                          </p>
                          <h3>{project.title}</h3>
                        </div>
                        <span className="project-status">
                          <span />
                          {project.status || "Prototype"}
                        </span>
                      </div>
                    </button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
            {filter === "All work" && (
              <button
                className="more-work"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show selected work" : "More from the workbench"}
                <span>{expanded ? "−" : "+"}</span>
                <span className="eyebrow">
                  {expanded ? "04 SELECTED" : "04 MORE PROJECTS"}
                </span>
              </button>
            )}
            <div className="explorations">
              <p className="eyebrow">ALSO ON MY WORKBENCH</p>
              {additionalWork.map(([title, description]) => (
                <details key={title}>
                  <summary>
                    {title}
                    <Plus size={17} />
                  </summary>
                  <p>{description}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="about" className="about-section section">
            <div className="page-width about-grid">
              <Reveal className="portrait-block">
                <div className="portrait-image">
                  <img
                    src={`${import.meta.env.BASE_URL}gaurang-photo.jpg`}
                    alt="Gaurang Bhogle in a dark suit"
                    loading="lazy"
                    width="720"
                    height="960"
                  />
                  <span className="portrait-cross" aria-hidden="true">
                    +
                  </span>
                  <div className="portrait-name">
                    GAURANG
                    <br />
                    BHOGLE<span>↗</span>
                  </div>
                </div>
                <div className="portrait-caption eyebrow">
                  <span>ENGINEER BY TRAINING.</span>
                  <span>BUILDER BY INSTINCT.</span>
                </div>
              </Reveal>
              <Reveal className="about-copy">
                <p className="eyebrow section-kicker">
                  <span>02 /</span> THE PERSON BEHIND THE PROJECTS
                </p>
                <h2>
                  Curiosity is
                  <br />
                  my <span className="accent">power source.</span>
                </h2>
                <p className="about-lead">
                  I was the kid taking things apart.
                  <br />
                  Now I put ideas together.
                </p>
                <p>
                  My route into engineering started with everyday electronics, a
                  soldering iron, and the urge to understand what makes things
                  tick. That same curiosity now takes me from flight controllers
                  to AI companions.
                </p>
                <p>
                  I'm Gaurang, an electrical engineering candidate based in Navi
                  Mumbai. I build across hardware and software, learn by doing,
                  and care about that moment when a prototype finally comes
                  alive.
                </p>
                <a className="text-link" href="#experience">
                  A little more about my journey <ArrowDown size={16} />
                </a>
                <div className="about-footnote">
                  <CircuitBoard size={24} />
                  <span>
                    At home between a circuit board
                    <br />
                    and a blank canvas.
                  </span>
                </div>
              </Reveal>
            </div>
            <div className="page-width capabilities">
              {capabilities.map((group, index) => (
                <Reveal className="capability" key={group.title}>
                  <div className="capability-top">
                    <span className="eyebrow">/{group.number}</span>
                    {index === 0 ? (
                      <Zap />
                    ) : index === 1 ? (
                      <Radio />
                    ) : index === 2 ? (
                      <CircuitBoard />
                    ) : (
                      <span className="asterisk">✳</span>
                    )}
                  </div>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="experience"
            className="section page-width experience-section"
          >
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow section-kicker">
                  <span>03 /</span> THE JOURNEY
                </p>
                <h2>
                  Always learning.
                  <br />
                  <span className="muted">Always building.</span>
                </h2>
              </div>
              <p className="section-note">
                From the first solder joint
                <br />
                to what comes next.
              </p>
            </Reveal>
            <div className="experience-list">
              {experience.map((item, index) => (
                <Reveal key={item.company}>
                  <details
                    className="experience-item"
                    open={index === 0 ? true : undefined}
                  >
                    <summary>
                      <span className="eyebrow experience-date">
                        {item.date}
                      </span>
                      <span className="experience-title">
                        <span>{item.company}</span>
                        <small>{item.role}</small>
                      </span>
                      <span className="experience-expand">
                        <Plus size={19} />
                      </span>
                    </summary>
                    <p>{item.description}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <div className="education-grid">
              <Reveal>
                <p className="eyebrow section-kicker">THE FOUNDATION</p>
                <h3>B.E. Electrical Engineering</h3>
                <p>Fr. Conceicao Rodrigues Institute of Technology, Vashi</p>
                <span className="eyebrow muted">
                  2022 — PRESENT / NAVI MUMBAI
                </span>
              </Reveal>
              <Reveal>
                <details className="certifications">
                  <summary>
                    Learning never stops.
                    <span className="eyebrow">05 CERTIFICATIONS</span>
                    <Plus size={18} />
                  </summary>
                  {certifications.map(([year, title]) => (
                    <div className="certification-row" key={title}>
                      <span className="eyebrow">{year}</span>
                      <p>{title}</p>
                    </div>
                  ))}
                </details>
              </Reveal>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="page-width">
              <div className="contact-top">
                <span className="eyebrow">
                  <span className="status-dot" /> OPEN TO CONVERSATIONS &
                  COLLABORATIONS
                </span>
                <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
              </div>
              <Reveal>
                <a className="contact-title" href={`mailto:${email}`}>
                  <h2>
                    Let's make
                    <br />
                    something <span>matter.</span>
                  </h2>
                  <ArrowUpRight className="contact-arrow" strokeWidth={1} />
                </a>
              </Reveal>
              <div className="contact-bottom">
                <div>
                  <a className="email-link" href={`mailto:${email}`}>
                    {email}
                  </a>
                  <button
                    className="copy-button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <span className="copy-feedback" role="status">
                    {copied
                      ? "Copied!"
                      : copyFailed
                        ? "Select the address to copy it."
                        : ""}
                  </span>
                </div>
                <p>
                  Engineering opportunities. Wild ideas.
                  <br />
                  Good conversations. My inbox is open.
                </p>
              </div>
            </div>
          </section>
        </main>
        <footer className="page-width site-footer">
          <a href="#top" className="footer-logo" aria-label="Back to top">
            gb<span>↗</span>
          </a>
          <div className="footer-links">
            <a
              href="https://github.com/soulofswords"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} />
              GitHub
              <ArrowUpRight size={13} />
            </a>
            <a
              href="https://linkedin.com/in/gaurang-bhogle"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={15} />
              LinkedIn
              <ArrowUpRight size={13} />
            </a>
            <a
              href="https://www.youtube.com/@fpvninjamumbai"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube size={15} />
              FPV channel
              <ArrowUpRight size={13} />
            </a>
          </div>
          <span className="eyebrow footer-credit">
            © {new Date().getFullYear()} GAURANG BHOGLE
            <br />
            <span>BUILT WITH INTENTION. AND A LITTLE OBSESSION.</span>
          </span>
        </footer>
        {activeProject && (
          <ProjectDialog
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </div>
    </MotionConfig>
  );
}

export default App;

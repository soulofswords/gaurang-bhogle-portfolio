import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, Pause, Play, X } from "lucide-react";
import { featuredProjects, selectedProjects, type Project } from "./data";

const guides = [
  { name: "Sakura", label: "AI & COMPANIONS", color: "#f5a5c8", question: "What is Sakura?", title: "Software with a little soul.", text: featuredProjects[0].description, project: featuredProjects[0], note: "Local AI · voice · avatars", kind: "flower" },
  { name: "Rotor", label: "FLIGHT & HARDWARE", color: "#ff9067", question: "Does he build drones?", title: "Ideas that actually take off.", text: selectedProjects[2].description, project: selectedProjects[2], note: "Build · tune · fly · repeat", kind: "drone" },
  { name: "Volt", label: "CIRCUITS & POWER", color: "#f6d85d", question: "What about engineering?", title: "Curiosity. Meet circuit board.", text: selectedProjects[0].description, project: selectedProjects[0], note: "Electrical engineering · prototyping", kind: "battery" },
  { name: "Frame", label: "CREATIVE TECHNOLOGY", color: "#9db9fa", question: "And the creative side?", title: "From a face to a live performance.", text: featuredProjects[1].description, project: featuredProjects[1], note: "Tracking · motion · production", kind: "screen" },
] as const;

// Original vector characters; each is a visual guide to existing project notes.
function Mascot({ kind }: { kind: string }) {
  return <svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
    <ellipse cx="90" cy="163" rx="49" ry="8" fill="#17171d" opacity=".12" />
    <g className="mascot-body" stroke="#17171d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M69 137v16l-12 2M111 137v16l12 2" />
      {kind === "flower" ? <>
        <path d="M90 38C64 0 36 31 48 55C5 54 13 98 44 102C15 129 54 154 75 129C89 166 122 145 120 119C159 133 176 90 143 78C172 50 139 20 114 44C113 22 97 20 90 38Z" fill="var(--guide-color)" />
        <circle cx="89" cy="86" r="37" fill="#fff5d6" />
      </> : kind === "drone" ? <>
        <path d="m50 72-20-29m100 29 20-29M46 119l-18 20m106-20 18 20" />
        <g className="rotor-lines"><ellipse cx="30" cy="40" rx="24" ry="7" fill="#fbf9ef" /><ellipse cx="150" cy="40" rx="24" ry="7" fill="#fbf9ef" /></g>
        <rect x="40" y="62" width="100" height="76" rx="32" fill="var(--guide-color)" />
        <path d="M57 69h66v39H57z" fill="#fff5d6" />
        <path d="M78 126h24" />
      </> : kind === "battery" ? <>
        <rect x="73" y="24" width="34" height="17" rx="5" fill="#17171d" />
        <rect x="43" y="39" width="94" height="103" rx="20" fill="var(--guide-color)" />
        <path d="m92 106-12 16h13l-5 13 16-19H91Z" fill="#17171d" strokeWidth="2" />
        <path d="M43 93 29 106m108-13 14 13" />
      </> : <>
        <path d="M90 41V25m-8 0h16" />
        <rect x="30" y="45" width="120" height="94" rx="18" fill="var(--guide-color)" />
        <rect x="43" y="57" width="94" height="62" rx="12" fill="#fff5d6" />
        <path d="M82 129h16M30 85 18 99m132-14 12 14" />
      </>}
      <g className="mascot-eyes" fill="white"><ellipse cx="73" cy="82" rx="14" ry="18" /><ellipse cx="108" cy="82" rx="14" ry="18" /></g>
      <g fill="#17171d" stroke="none"><ellipse cx="77" cy="85" rx="5" ry="8" /><ellipse cx="112" cy="85" rx="5" ry="8" /></g>
      {kind !== "drone" && kind !== "battery" && <path d="M82 108q9 7 18-1" strokeWidth="3" />}
    </g>
  </svg>;
}

function Bench() {
  return <svg className="bench-drawing" viewBox="0 0 240 150" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 109h210v9H15zm14 9v26m182-26v26" fill="var(--bg)" />
      <rect x="43" y="29" width="112" height="72" rx="5" fill="var(--bg)" />
      <path d="M52 38h94v52H52z" fill="#b9c9fa" /><path d="m66 53 12 10-12 10m23 0h19M90 101v8m20-8v8" />
      <path d="M176 76h24v32h-24zM200 81h9v16h-9" fill="#f6d85d" />
      <path d="M181 63c-9-10 10-12 1-22m12 22c-9-10 10-12 1-22" strokeWidth="2" />
      <path d="M14 130h38v13H14" fill="#f5a5c8" />
    </g>
  </svg>;
}

function GuideDialog({ initial, tour, close, openProject }: { initial: number; tour: boolean; close: () => void; openProject: (p: Project) => void }) {
  const [step, setStep] = useState(initial);
  const ref = useRef<HTMLDialogElement>(null);
  const guide = guides[step];
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current!;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className="guide-dialog" aria-labelledby="guide-title" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} style={{ "--guide-color": guide.color } as CSSProperties}>
    <button className="icon-button guide-close" onClick={close} aria-label="Close guide"><X /></button>
    <div className="guide-avatar"><Mascot kind={guide.kind} /></div>
    <span className="eyebrow">{guide.name} / {tour ? `STUDIO TOUR ${step + 1} OF 4` : "PROJECT GUIDE"}</span>
    <div aria-live="polite" aria-atomic="true">
      <h2 id="guide-title">{guide.title}</h2>
      <p>{guide.text}</p>
      <span className="guide-note">{guide.note}</span>
    </div>
    <button className="play-button" onClick={() => { close(); openProject(guide.project); }}>Open project notes <ArrowRight size={17} /></button>
    <div className="guide-footer"><span>Curated notes, not an AI chat.</span>{tour && <div><button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button onClick={() => step === 3 ? close() : setStep(step + 1)}>{step === 3 ? "Finish tour" : "Next stop →"}</button></div>}</div>
  </dialog>;
}

export function Playground({ motionOff, reducedMotion, toggleMotion, openProject }: { motionOff: boolean; reducedMotion: boolean; toggleMotion: () => void; openProject: (p: Project) => void }) {
  const [guide, setGuide] = useState<{ index: number; tour: boolean } | null>(null);
  return <section id="top" className="playground" aria-label="Gaurang's interactive studio">
    <div className="studio-topline"><span><i /> THE CURIOSITY CLUB</span><span>NAVI MUMBAI, IN <span className="studio-clock">↗</span></span></div>
    <div className="studio-world">
      <div className="studio-title">
        <span className="studio-kicker">A few different interests. One very curious human.</span>
        <h1>MEET<br /><span className="name-word">GAURANG<span className="name-spark" aria-hidden="true">✳</span></span><span className="title-period">.</span></h1>
        <p>I make things <span className="word-fly">fly</span>, <span className="word-think">think</span> & <span className="word-feel">feel.</span></p>
        <p className="studio-subtitle">Electrical engineering. AI companions. Creative experiments.<br />Come poke around my corner of the internet.</p>
        <div className="studio-actions"><button className="play-button" onClick={() => setGuide({ index: 0, tour: true })}>Take the studio tour <ArrowRight size={17} /></button><a className="play-button secondary" href="#projects">See the work <ArrowDown size={17} /></a></div>
      </div>
      <div className="studio-handnote" aria-hidden="true">psst… we’re clickable!<span>↙</span></div>
      {guides.map((item, index) => <button key={item.name} className={`studio-guide guide-${index}`} aria-label={`Meet ${item.name}: ${item.question}`} onClick={() => setGuide({ index, tour: false })} style={{ "--guide-color": item.color, "--bob-delay": `${index * -.8}s` } as CSSProperties}>
        <span className="guide-bubble">{item.question}</span><Mascot kind={item.kind} /><span className="guide-name">{item.name} <span>↗</span></span><span className="guide-label">{item.label}</span>
      </button>)}
      <div className="studio-bench"><Bench /><span>ONE MORE LITTLE EXPERIMENT…</span></div>
      <div className="studio-orbit" aria-hidden="true"><svg viewBox="0 0 120 100"><ellipse cx="60" cy="50" rx="53" ry="20" /><ellipse cx="60" cy="50" rx="53" ry="20" transform="rotate(60 60 50)" /><ellipse cx="60" cy="50" rx="53" ry="20" transform="rotate(120 60 50)" /><circle cx="60" cy="50" r="7" /></svg><span>STAY CURIOUS.</span></div>
      <span className="studio-plus plus-one" aria-hidden="true">+</span><span className="studio-plus plus-two" aria-hidden="true">+</span>
    </div>
    <div className="studio-bottom"><span>4 LITTLE GUIDES · A WHOLE LOT OF CURIOSITY</span><a href="#projects">SCROLL TO EXPLORE ↓</a><button className="motion-control" disabled={reducedMotion} aria-pressed={!motionOff} onClick={toggleMotion} aria-label={reducedMotion ? "Reduced motion enabled by your system" : motionOff ? "Enable motion" : "Pause motion"}>{motionOff ? <Play size={12} /> : <Pause size={12} />}{motionOff ? "MOTION OFF" : "MOTION ON"}</button></div>
    {guide && <GuideDialog initial={guide.index} tour={guide.tour} close={() => setGuide(null)} openProject={openProject} />}
  </section>;
}

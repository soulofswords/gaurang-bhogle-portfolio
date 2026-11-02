import { AudioLines, CircuitBoard, ScanFace, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "./data";

// Original illustrative compositions, not screenshots of the products.
export function ProjectVisual({ project }: { project: Project }) {
  if (project.title === "Sakura Companion")
    return (
      <div className="visual visual-sakura" aria-hidden="true">
        <div className="sakura-orbit" />
        <div className="sakura-orbit second" />
        <div className="sakura-word">桜</div>
        <div className="sakura-window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>SAKURA / COMPANION</span>
            <Sparkles size={12} />
          </div>
          <div className="companion-content">
            <div className="companion-flower">✳</div>
            <span className="companion-title">A little more human.</span>
            <span className="companion-subtitle">
              Your world. Your companion.
            </span>
            <div className="audio-wave">
              {Array.from({ length: 30 }, (_, i) => (
                <i
                  key={i}
                  style={
                    {
                      "--bar-height": `${10 + Math.sin(i * 1.6) ** 2 * 28}px`,
                      "--delay": `${i * -0.09}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <div className="companion-input">
              A thought. A conversation. A possibility.<span>↗</span>
            </div>
          </div>
        </div>
        <span className="visual-corner">LOCAL AI · VOICE · MEMORY</span>
      </div>
    );
  if (project.title === "Sakura VTuber")
    return (
      <div className="visual visual-vtuber" aria-hidden="true">
        <div className="tracking-grid" />
        <div className="avatar-frame">
          <div className="tracking-corner tl" />
          <div className="tracking-corner tr" />
          <div className="tracking-corner bl" />
          <div className="tracking-corner br" />
          <div className="avatar-head">
            <div className="avatar-face">
              <span />
              <span />
            </div>
            <div className="avatar-neck" />
            <div className="avatar-body" />
          </div>
          <div className="tracking-scan" />
        </div>
        <div className="tracking-label">
          <span />
          FACE & HAND TRACKING
        </div>
        <div className="tracking-panel">
          <ScanFace size={18} />
          <span>
            EXPRESSION
            <br />
            <strong>
              Be yourself.
              <br />
              In any form.
            </strong>
          </span>
        </div>
        <div className="voice-panel">
          <AudioLines size={16} />
          <span>VOICE / RVC</span>
          <div className="tiny-wave">∿∿∿∿</div>
        </div>
        <span className="visual-corner">
          REALTIME · YOUR IDENTITY, REIMAGINED
        </span>
      </div>
    );
  if (project.title === "FPV Drone Platforms")
    return (
      <div className="visual visual-drone" aria-hidden="true">
        <div className="radar-ring ring-a" />
        <div className="radar-ring ring-b" />
        <div className="radar-ring ring-c" />
        <div className="radar-sweep" />
        <div className="drone-body">
          <div className="drone-arm arm-a" />
          <div className="drone-arm arm-b" />
          <div className="drone-core">
            <span>FPV</span>
            <i />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`drone-rotor rotor-${i}`}>
              <div className="propeller" />
            </div>
          ))}
        </div>
        <span className="drone-type">
          MADE
          <br />
          TO FLY.
        </span>
        <span className="drone-spec">
          3.5″ CINEWHOOP
          <br />
          5″ DIGITAL
          <br />
          7″ LONG RANGE
        </span>
        <span className="visual-corner">BUILD / TUNE / FLY / REPEAT</span>
      </div>
    );
  if (project.title === "Smart BMS for EV")
    return (
      <div className="visual visual-battery" aria-hidden="true">
        <div className="circuit-grid" />
        <div className="battery-pack">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              className="battery-cell"
              key={i}
              style={{ "--cell": i } as CSSProperties}
            >
              <i />
              <span>18650</span>
              <b>+</b>
            </div>
          ))}
        </div>
        <div className="battery-data">
          <span className="battery-status">● IN DEVELOPMENT</span>
          <strong>
            Energy.
            <br />
            Under control.
          </strong>
          <span>3S4P / NMC / 18650</span>
        </div>
        <span className="visual-corner">MONITORING · PROTECTION · CONTROL</span>
      </div>
    );
  return (
    <div className="visual visual-technical" aria-hidden="true">
      <div className="circuit-grid" />
      {project.image ? (
        <img
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="inverter-visual">
          <CircuitBoard size={80} />
          <span>DC</span>
          <span className="sine-wave">∿</span>
          <span>AC</span>
        </div>
      )}
      <span className="visual-corner">
        {project.tags.join(" / ").toUpperCase()}
      </span>
    </div>
  );
}

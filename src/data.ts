const sakuraUrl = "https://soulofswords.github.io/Sakura-website/";

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
  status?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Sakura Companion",
    category: "Desktop AI product",
    description:
      "A Windows character companion combining local or cloud AI, memory, voice, approved Agent workflows and optional webcam tracking in one creator-focused application.",
    tags: ["Python", "Local AI", "Product design", "Desktop"],
    image: "project-ai.svg",
    imageAlt: "Diagram of the context and response loop in Sakura Companion",
    href: sakuraUrl,
    linkLabel: "View product and downloads",
    status: "Released",
  },
  {
    title: "Sakura VTuber",
    category: "Creator and streaming tool",
    description:
      "A standalone VTuber workflow with face and hand tracking, model controls, RVC voice conversion, Spout and virtual-camera output for live production.",
    tags: ["Computer vision", "Realtime", "Streaming", "UX"],
    image: "project-vtuber.svg",
    imageAlt: "Diagram of the avatar and live-stream workflow in Sakura VTuber",
    href: sakuraUrl,
    linkLabel: "View product and downloads",
    status: "Released",
  },
];

export const selectedProjects: Project[] = [
  {
    title: "Smart BMS for EV",
    category: "Battery systems",
    description:
      "An ongoing 3S4P 18650 NMC battery-management prototype covering cell monitoring, protection logic, Arduino control and MATLAB simulation.",
    tags: ["BMS", "Arduino", "MATLAB"],
    image: "project-bms.svg",
    imageAlt: "Battery cells connected to monitoring and protection logic",
    status: "In development",
  },
  {
    title: "IoT Smart Energy Meter",
    category: "Energy monitoring",
    description:
      "A connected meter for voltage, current and RMS measurement. The single-phase prototype produced reliable readings and informed a three-phase iteration.",
    tags: ["ESP32", "PZEM", "IoT"],
    image: "project-meter.svg",
    imageAlt: "Energy meter dashboard showing live electrical readings",
    href: "https://github.com/soulofswords/iot-smart-meter",
    linkLabel: "View repository",
  },
  {
    title: "FPV Drone Platforms",
    category: "UAV systems",
    description:
      "Three years of assembling, tuning and repairing 3.5-inch cinewhoops, 5-inch digital builds and 7-inch long-range platforms.",
    tags: ["Betaflight", "iNav", "Fabrication"],
    image: "project-drone.svg",
    imageAlt: "Technical diagram of an FPV quadcopter and flight data",
    status: "Ongoing practice",
  },
  {
    title: "Half-Bridge Inverter",
    category: "Power electronics",
    description:
      "A practical study of switching and DC-to-AC conversion, developed to strengthen power-stage assembly, testing and technical documentation.",
    tags: ["Inverter", "Switching", "Power"],
    href: "https://github.com/soulofswords/inverter-half-bridge",
    linkLabel: "View repository",
  },
  {
    title: "Obstacle Avoidance Car",
    category: "Embedded robotics",
    description:
      "An autonomous vehicle prototype using distance sensing and embedded control logic to detect obstacles and select a clear path.",
    tags: ["Arduino", "Sensors", "Robotics"],
    image: "project-robot.svg",
    imageAlt: "Obstacle-avoidance robot sensing objects in its path",
    href: "https://github.com/soulofswords/obstacle-avoidance-robot",
    linkLabel: "View repository",
  },
  {
    title: "Music-Reactive LED Strip",
    category: "Creative electronics",
    description:
      "A realtime lighting prototype that maps incoming audio energy to colour and motion for responsive ambient installations.",
    tags: ["Audio", "LED", "Realtime"],
    image: "project-led.svg",
    imageAlt: "Audio waveform driving a colour-changing LED strip",
    href: "https://github.com/soulofswords/music-reactive-led",
    linkLabel: "View repository",
  },
];

export const additionalWork = [
  [
    "Job Application Automator",
    "Agent-assisted research and repetitive workflow automation.",
  ],
  [
    "ComfyUI Media Pipelines",
    "Node-based image, concept and 3D generation workflows.",
  ],
  [
    "Early Electronics Lab",
    "Fans, alarms, emergency lights, speakers, visualizers and an E-bike.",
  ],
];

export const experience = [
  {
    date: "Aug 2026 — Present",
    company: "Preflight Labs LLP",
    role: "Engineering Intern",
    description:
      "Supporting technical systems, AI-assisted development and product experimentation in an applied engineering environment.",
  },
  {
    date: "2022 — Present",
    company: "Independent FPV Drone Builder",
    role: "UAV design, assembly and troubleshooting",
    description:
      "Build, tune and repair FPV platforms; integrate cameras and flight hardware; prototype mounts; and help peers diagnose hardware and configuration issues.",
  },
  {
    date: "Dec 2024 — Jan 2025",
    company: "Rashtriya Chemicals & Fertilizers",
    role: "Electrical Engineering Intern · A.N. Melt Plant",
    description:
      "Completed 15 days of industrial training focused on plant processes, electrical equipment and maintenance practices.",
  },
  {
    date: "Dec 2024 — Jan 2025",
    company: "Space Root Education",
    role: "Technical Collaborator",
    description:
      "Supported component selection, Betaflight setup and troubleshooting for a 7-inch long-range drone and related student builds.",
  },
  {
    date: "2020 — Present",
    company: "Independent / Freelance",
    role: "Video creator and editor",
    description:
      "Produce videos from scripting and voiceover through editing, motion graphics, thumbnails and publishing.",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Electrical & power",
    items: [
      "Circuit prototyping",
      "Wiring and soldering",
      "Battery systems",
      "Power electronics",
      "Energy measurement",
    ],
  },
  {
    number: "02",
    title: "Embedded & flight",
    items: [
      "Arduino and C++",
      "Microcontrollers",
      "Betaflight",
      "iNav and Mission Planner",
      "FPV assembly and tuning",
    ],
  },
  {
    number: "03",
    title: "Software & AI",
    items: [
      "Python fundamentals",
      "AI-assisted development",
      "Local language models",
      "Automation workflows",
      "Testing and debugging",
    ],
  },
  {
    number: "04",
    title: "Design & production",
    items: [
      "3D printing",
      "Premiere Pro",
      "After Effects",
      "Photoshop",
      "Motion graphics",
    ],
  },
];

export const certifications = [
  ["2026", "Infosys — Introduction to Cyber Security"],
  ["2024", "Infosys — Demystifying Generative AI for Leaders"],
  ["2024", "LinkedIn Learning — Python Essential Training"],
  ["2024", "LinkedIn Learning — Getting Started with Power BI"],
  ["2023", "Infosys — Young IoT Prodigy"],
];

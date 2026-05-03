import { Project } from './types';
import { generateProjectImage } from './lib/generateImage';

const RAW_PROJECTS: Omit<Project, 'img'>[] = [
  { 
    id: 1, 
    title: "Packs Light 01", 
    category: "Brand Identity", 
    client: "Packs Light Co.", 
    year: 2024, 
    type: "patch", 
    x: -820, y: -450, rotate: -4, scale: 1.05, width: 280
  },
  { 
    id: 2, 
    title: "Hits Heavy Wide", 
    category: "Packaging", 
    client: "Packs Light Co.", 
    year: 2024, 
    type: "patch", 
    x: -340, y: -520, rotate: 3, scale: 0.95, width: 340
  },
  { 
    id: 3, 
    title: "Bold Block", 
    category: "Type Specimen", 
    client: "Packs Light Co.", 
    year: 2023, 
    type: "patch", 
    x: 180, y: -580, rotate: -2, scale: 1.1, width: 260
  },
  { 
    id: 4, 
    title: "Packs Light Oval", 
    category: "Hospitality", 
    client: "Packs Light Co.", 
    year: 2025, 
    type: "patch", 
    x: 640, y: -420, rotate: 5, scale: 1, width: 300
  },
  { 
    id: 5, 
    title: "Keystone Crest", 
    category: "Brand Identity", 
    client: "Packs Light Co.", 
    year: 2024, 
    type: "patch", 
    x: -620, y: -180, rotate: 2, scale: 0.9, width: 260
  },
  { 
    id: 6, 
    title: "Tex USA Crest", 
    category: "Packaging", 
    client: "Turtlebox", 
    year: 2024, 
    type: "patch", 
    x: -180, y: -240, rotate: -3, scale: 1.05, width: 280
  },
  { 
    id: 7, 
    title: "Live Free Orange", 
    category: "Art Direction", 
    client: "Turtlebox", 
    year: 2023, 
    type: "patch", 
    x: 320, y: -160, rotate: -6, scale: 0.95, width: 320
  },
  { 
    id: 8, 
    title: "Script Hat Navy", 
    category: "Brand Identity", 
    client: "Turtlebox", 
    year: 2025, 
    type: "hat", 
    x: 840, y: -220, rotate: 1, scale: 1.15, width: 320
  },
  { 
    id: 9, 
    title: "Mountain Crest", 
    category: "Wayfinding", 
    client: "Turtlebox", 
    year: 2024, 
    type: "patch", 
    x: -940, y: 80, rotate: 5, scale: 1, width: 270
  },
  { 
    id: 10, 
    title: "Rainbow Stripe", 
    category: "Brand Identity", 
    client: "Turtlebox", 
    year: 2023, 
    type: "patch", 
    x: -480, y: 120, rotate: -2, scale: 0.85, width: 310
  },
  { 
    id: 11, 
    title: "Handle Care Oval", 
    category: "Packaging", 
    client: "Turtlebox", 
    year: 2024, 
    type: "patch", 
    x: 40, y: 40, rotate: 8, scale: 1.05, width: 290
  },
  { 
    id: 12, 
    title: "Script Hat Tan", 
    category: "Art Direction", 
    client: "Turtlebox", 
    year: 2024, 
    type: "hat", 
    x: 460, y: 140, rotate: -4, scale: 1.1, width: 320
  },
  { 
    id: 13, 
    title: "Loud Hat Navy", 
    category: "Editorial Design", 
    client: "Turtlebox", 
    year: 2025, 
    type: "hat", 
    x: 920, y: 180, rotate: 0, scale: 1.15, width: 320
  },
  { 
    id: 14, 
    title: "Records Hat Olive", 
    category: "Hospitality", 
    client: "Turtlebox", 
    year: 2024, 
    type: "hat", 
    x: -780, y: 420, rotate: -7, scale: 1, width: 320
  },
  { 
    id: 15, 
    title: "Mountain Hat Tan", 
    category: "Brand Identity", 
    client: "Turtlebox", 
    year: 2025, 
    type: "hat", 
    x: -260, y: 480, rotate: 4, scale: 1.05, width: 320
  },
  { 
    id: 16, 
    title: "Mountain Hat White", 
    category: "Art Direction", 
    client: "Turtlebox", 
    year: 2024, 
    type: "hat", 
    x: 240, y: 360, rotate: -5, scale: 0.95, width: 320
  },
  { 
    id: 17, 
    title: "Oval Hat Brown", 
    category: "Packaging", 
    client: "Turtlebox", 
    year: 2025, 
    type: "hat", 
    x: 680, y: 460, rotate: 6, scale: 1.1, width: 320
  },
  { 
    id: 18, 
    title: "Live Free Navy", 
    category: "Web + Brand", 
    client: "Turtlebox", 
    year: 2023, 
    type: "patch", 
    x: -540, y: 640, rotate: -2, scale: 0.9, width: 320
  },
  { 
    id: 19, 
    title: "Camp Sketch", 
    category: "Editorial Design", 
    client: "Turtlebox", 
    year: 2024, 
    type: "sketch", 
    x: 60, y: 680, rotate: 1, scale: 1.1, width: 280
  },
  { 
    id: 20, 
    title: "Records Patch", 
    category: "Brand Identity", 
    client: "Turtlebox", 
    year: 2024, 
    type: "patch", 
    x: 580, y: 650, rotate: -3, scale: 1.05, width: 300
  },
  { 
    id: 21, 
    title: "Bonus Script", 
    category: "Type Specimen", 
    client: "Turtlebox", 
    year: 2025, 
    type: "patch", 
    x: -1100, y: 200, rotate: 8, scale: 0.9, width: 280
  }
];

export const PROJECTS: Project[] = RAW_PROJECTS.map(p => ({
  ...p,
  img: generateProjectImage(p.id, p.type, p.title)
} as Project));

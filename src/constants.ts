import { Project } from './types';

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Norse Atelier", 
    category: "Brand Identity", 
    client: "Atelier Norse", 
    year: 2024, 
    type: "box", 
    img: "https://images.unsplash.com/photo-1549463327-0131499971bc?q=80&w=2600&auto=format&fit=crop", 
    x: -380, y: -220, rotate: -4, scale: 1,
    brief: "Creating a minimalist visual language for a Scandinavian furniture atelier.",
    role: "Lead Identity Designer"
  },
  { 
    id: 2, 
    title: "Field & Form", 
    category: "Packaging", 
    client: "Field & Form Studio", 
    year: 2024, 
    type: "bottle", 
    img: "https://images.unsplash.com/photo-1556228578-000412827a26?q=80&w=2600&auto=format&fit=crop", 
    x: -120, y: -280, rotate: 3, scale: 0.95,
    brief: "Tactile glass packaging for artisanal botanical extracts.",
    role: "Structural Branding"
  },
  { 
    id: 3, 
    title: "Meridian Coffee", 
    category: "Packaging + Identity", 
    client: "Meridian Coffee Co.", 
    year: 2023, 
    type: "bag", 
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=2600&auto=format&fit=crop", 
    x: 180, y: -240, rotate: -2, scale: 1.05 
  },
  { id: 4, title: "Heirloom Press", category: "Editorial Design", client: "Heirloom Press", year: 2024, type: "book", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2600&auto=format&fit=crop", x: 480, y: -180, rotate: 5, scale: 1 },
  { id: 5, title: "Solace Spa", category: "Brand Identity", client: "Solace Wellness", year: 2025, type: "badge", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1528&auto=format&fit=crop", x: -480, y: 40, rotate: 6, scale: 0.9 },
  { id: 6, title: "Carto", category: "Art Direction", client: "Carto Maps", year: 2023, type: "poster", img: "https://images.unsplash.com/photo-1546197390-e5a978ddca43?q=80&w=1530&auto=format&fit=crop", x: -160, y: 60, rotate: -3, scale: 1 },
  { id: 7, title: "Lumen Type", category: "Type Specimen", client: "Self-initiated", year: 2024, type: "spread", img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1480&auto=format&fit=crop", x: 220, y: 80, rotate: 2, scale: 1 },
  { id: 8, title: "Wren Botanicals", category: "Packaging", client: "Wren & Co.", year: 2023, type: "tube", img: "https://images.unsplash.com/photo-1556228578-8ed8a1603998?q=80&w=2600&auto=format&fit=crop", x: 580, y: 60, rotate: -5, scale: 0.95 },
  { id: 9, title: "Tide Records", category: "Album Art Direction", client: "Tide Records", year: 2025, type: "vinyl", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2600&auto=format&fit=crop", x: -420, y: 320, rotate: 4, scale: 1.05 },
  { id: 10, title: "Quartermark", category: "Brand Identity", client: "Quartermark Whisky", year: 2024, type: "label", img: "https://images.unsplash.com/photo-1502872337629-fd828a206584?q=80&w=2600&auto=format&fit=crop", x: -120, y: 360, rotate: -6, scale: 1 },
  { id: 11, title: "North Bay Civic", category: "Wayfinding", client: "City of North Bay", year: 2023, type: "signage", img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2600&auto=format&fit=crop", x: 200, y: 380, rotate: 3, scale: 1 },
  { id: 12, title: "Folio Magazine", category: "Editorial Design", client: "Folio Press", year: 2025, type: "magazine", img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2000&auto=format&fit=crop", x: 540, y: 340, rotate: -4, scale: 1 },
  { id: 13, title: "Ember Outdoor", category: "Brand Identity", client: "Ember Co.", year: 2022, type: "patch", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1528&auto=format&fit=crop", x: -560, y: -80, rotate: 7, scale: 0.85 },
  { id: 14, title: "Sundial", category: "Web + Brand", client: "Sundial Software", year: 2024, type: "device", img: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2600&auto=format&fit=crop", x: 60, y: -60, rotate: -2, scale: 1.1 },
  { id: 15, title: "Mossroot Tea", category: "Packaging", client: "Mossroot", year: 2023, type: "tin", img: "https://images.unsplash.com/photo-1556228578-8ed8a1603998?q=80&w=2000&auto=format&fit=crop", x: 380, y: -60, rotate: 5, scale: 0.95 },
  { id: 16, title: "Dossier Co.", category: "Editorial + Identity", client: "Dossier", year: 2025, type: "folder", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2600&auto=format&fit=crop", x: -300, y: 180, rotate: 2, scale: 1 },
  { id: 17, title: "Halcyon", category: "Hospitality Brand", client: "Halcyon Hotels", year: 2024, type: "key-card", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2600&auto=format&fit=crop", x: 60, y: 200, rotate: -3, scale: 1.05 }
];

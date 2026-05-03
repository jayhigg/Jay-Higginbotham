export interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  year: number;
  type: string;
  img: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  description?: string;
  brief?: string;
  role?: string;
}

export type ViewType = 'index' | 'about' | 'process' | 'contact';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: "Shipped" | "Ongoing" | "Concept";
  image: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "nexus-os",
    title: "Nexus OS: 3D Workspace",
    description: "沉浸式数字工作空间演示，探索未来浏览器中的多任务交互逻辑。",
    category: "Development",
    tags: ["React", "Three.js"],
    status: "Shipped",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    github: "#",
  },
  {
    id: "linear-clone",
    title: "Linear-clone Framework",
    description: "为极简主义开发者打造的组件库，复刻 Linear 风格的高级质感。",
    category: "Design",
    tags: ["Tailwind", "UI Design"],
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop",
    github: "#",
  },
  {
    id: "aether-brand",
    title: "Aether Brand Identity",
    description: "虚构科技公司品牌全案设计，从 Logo 演变到 UI 语言的视觉闭环。",
    category: "Design",
    tags: ["Figma", "Branding"],
    status: "Concept",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop",
  },
  {
    id: "mindgraph-api",
    title: "MindGraph API",
    description: "专为知识管理设计的图数据库接口，支持千万级节点的检索。",
    category: "Development",
    tags: ["Next.js", "Supabase"],
    status: "Shipped",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2540&auto=format&fit=crop",
    github: "#",
  },
];

export const categories = ["All", "Development", "Design", "Experiments"];

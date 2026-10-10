import {
  Atom,
  BookOpen,
  Braces,
  Brain,
  CalendarDays,
  CircleDot,
  Code2,
  Coffee,
  Database,
  Dumbbell,
  FileCode2,
  Flag,
  GitBranch,
  Globe,
  Heart,
  LayoutTemplate,
  Monitor,
  Palette,
  Rocket,
  Server,
  Smartphone,
  Star,
  Target,
  Terminal,
  Trophy,
  Wrench,
  Zap,
  Leaf,
} from "lucide-react";

export const GOAL_ICON_OPTIONS = [
  { value: "target", label: "Obiettivo", icon: Target, color: "#2563eb" },
  { value: "rocket", label: "Progetto", icon: Rocket, color: "#9333ea" },
  { value: "book", label: "Studio", icon: BookOpen, color: "#16a34a" },
  { value: "dumbbell", label: "Fitness", icon: Dumbbell, color: "#dc2626" },
  { value: "trophy", label: "Traguardo", icon: Trophy, color: "#ca8a04" },
  { value: "star", label: "Priorità", icon: Star, color: "#ca8a04" },
  { value: "heart", label: "Personale", icon: Heart, color: "#dc2626" },
  { value: "zap", label: "Energia", icon: Zap, color: "#ca8a04" },
  { value: "dot", label: "Generico", icon: CircleDot, color: "#6b7280" },
  { value: "flag", label: "Milestone", icon: Flag, color: "#2563eb" },
  { value: "brain", label: "Apprendimento", icon: Brain, color: "#9333ea" },
  {
    value: "calendar",
    label: "Pianificazione",
    icon: CalendarDays,
    color: "#6b7280",
  },
  { value: "atom", label: "React", icon: Atom, color: "#0891b2" },
  { value: "database", label: "Database", icon: Database, color: "#0891b2" },
];

export const SKILL_ICON_OPTIONS = [
  { value: "code", label: "Codice", icon: Code2, color: "#2563eb" },
  { value: "atom", label: "React", icon: Atom, color: "#0891b2" },
  { value: "braces", label: "JavaScript", icon: Braces, color: "#ca8a04" },
  {
    value: "file-code",
    label: "TypeScript",
    icon: FileCode2,
    color: "#2563eb",
  },
  { value: "server", label: "Backend", icon: Server, color: "#16a34a" },
  { value: "terminal", label: "Terminale", icon: Terminal, color: "#6b7280" },
  {
    value: "layout",
    label: "Frontend",
    icon: LayoutTemplate,
    color: "#9333ea",
  },
  { value: "git", label: "Git", icon: GitBranch, color: "#dc2626" },
  { value: "palette", label: "Design", icon: Palette, color: "#9333ea" },
  { value: "coffee", label: "Java", icon: Coffee, color: "#dc2626" },
  { value: "database", label: "Database", icon: Database, color: "#0891b2" },
  { value: "leaf", label: "Spring", icon: Leaf, color: "#16a34a" },
  { value: "monitor", label: "Desktop", icon: Monitor, color: "#2563eb" },
  { value: "mobile", label: "Mobile", icon: Smartphone, color: "#9333ea" },
  { value: "globe", label: "Web", icon: Globe, color: "#0891b2" },
  { value: "tools", label: "Tools", icon: Wrench, color: "#6b7280" },
  { value: "brain", label: "Apprendimento", icon: Brain, color: "#9333ea" },
  { value: "rocket", label: "Progetto", icon: Rocket, color: "#dc2626" },
  { value: "zap", label: "Energia", icon: Zap, color: "#ca8a04" },
  { value: "book", label: "Studio", icon: BookOpen, color: "#16a34a" },
];

export const SKILL_ICONS = Object.fromEntries(
  SKILL_ICON_OPTIONS.map(({ value, icon }) => [value, icon]),
);

export const GOAL_ICONS = Object.fromEntries(
  GOAL_ICON_OPTIONS.map(({ value, icon }) => [value, icon]),
);

export const SKILL_ICON_COLORS = Object.fromEntries(
  SKILL_ICON_OPTIONS.map(({ value, color }) => [value, color]),
);

export const GOAL_ICON_COLORS = Object.fromEntries(
  GOAL_ICON_OPTIONS.map(({ value, color }) => [value, color]),
);

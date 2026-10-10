import { CheckCircle2, Pencil, Trash2, Code2 } from "lucide-react";

import { SKILL_ICONS, SKILL_ICON_COLORS } from "../../constants/icons";

import "./SkillCard.scss";

const CATEGORY_COLORS = {
  Frontend: "#3b82f6",
  Backend: "#16a34a",
  Database: "#0891b2",
  DevOps: "#f97316",
  Tools: "#a855f7",
  Other: "#6b7280",
  Altro: "#6b7280",
};

const NAME_TO_ICON = {
  react: "atom",
  javascript: "braces",
  js: "braces",
  typescript: "file-code",
  ts: "file-code",
  "node.js": "server",
  nodejs: "server",
  node: "server",
  python: "terminal",
  "html & css": "layout",
  html: "layout",
  css: "layout",
  git: "git",
  figma: "palette",
  java: "coffee",
  sql: "database",
  "spring boot": "leaf",
};

function getSkillVisual(skill) {
  const iconValue =
    skill.icon ||
    NAME_TO_ICON[(skill.name || "").trim().toLowerCase()] ||
    "code";

  return {
    icon: SKILL_ICONS[iconValue] || Code2,
    color:
      SKILL_ICON_COLORS[iconValue] ||
      CATEGORY_COLORS[skill.category] ||
      "#3b82f6",
  };
}

function getLevelInfo(level) {
  if (level >= 75) {
    return {
      label: "Avanzato",
      tone: "success",
    };
  }

  if (level >= 40) {
    return {
      label: "Intermedio",
      tone: "primary",
    };
  }

  return {
    label: "Principiante",
    tone: "danger",
  };
}

function SkillCard({ skill, onClick, onDelete, onEdit }) {
  const level = Math.min(Math.max(Number(skill.level) || 0, 0), 100);
  const isCompleted = level >= 100;
  const { icon: Icon, color } = getSkillVisual(skill);
  const levelInfo = getLevelInfo(level);

  const categoryLabel = skill.category === "Other" ? "Altro" : skill.category;

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(skill.id);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(skill);
  };

  return (
    <article
      className={`skill-card ${isCompleted ? "skill-card-completed" : ""}`}
      onClick={onClick}
    >
      <div className="skill-icon-wrapper">
        <div
          className="skill-icon"
          style={{
            backgroundColor: `${color}1f`,
            color,
          }}
          aria-hidden="true"
        >
          <Icon size={30} strokeWidth={1.8} />
        </div>
      </div>

      <div className="skill-card-content">
        <div className="skill-card-header">
          <div className="skill-info">
            <h3 title={skill.name}>{skill.name}</h3>

            {categoryLabel && (
              <span className="skill-category">{categoryLabel}</span>
            )}
          </div>

          {isCompleted && (
            <CheckCircle2 className="skill-completed-icon" size={21} />
          )}
        </div>

        <div className="skill-progress">
          <div className="skill-progress-header">
            <span>{levelInfo.label}</span>
            <strong>{level}%</strong>
          </div>

          <div
            className="skill-progress-bar"
            role="progressbar"
            aria-valuenow={level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Livello ${level}%`}
          >
            <div
              className={`skill-progress-fill tone-${levelInfo.tone}`}
              style={{ width: `${level}%` }}
            />
          </div>
        </div>

        <div className="skill-card-footer">
          <span className="skill-experience">
            Esperienza: {skill.experience ?? 0} mesi
          </span>

          <span
            className={`skill-status ${
              isCompleted ? "completed" : "in-progress"
            }`}
          >
            {isCompleted ? "Completata" : "In corso"}
          </span>
        </div>

        <div className="skill-card-actions">
          <button
            type="button"
            className="edit-skill-button"
            onClick={handleEdit}
          >
            <Pencil size={16} />
            Modifica
          </button>

          <button
            type="button"
            className="delete-skill-button"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Elimina
          </button>
        </div>
      </div>
    </article>
  );
}

export default SkillCard;

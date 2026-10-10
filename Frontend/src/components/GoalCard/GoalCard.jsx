import {
  CalendarDays,
  CheckCircle2,
  Target,
  Trash2,
  Pencil,
} from "lucide-react";

import { GOAL_ICONS, GOAL_ICON_COLORS } from "../../constants/icons";

import "./GoalCard.scss";

function GoalCard({ goal, onClick, onDelete, onEdit }) {
  const progress = Math.min(Math.max(Number(goal.progress) || 0, 0), 100);

  const isCompleted = progress >= 100;
  const Icon = GOAL_ICONS[goal.icon] || Target;
  const iconColor = GOAL_ICON_COLORS[goal.icon] || "#2563eb";

  const categoryLabel = goal.category === "Other" ? "Altro" : goal.category;

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(goal.id);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(goal);
  };

  return (
    <article
      className={`goal-card ${isCompleted ? "goal-card-completed" : ""}`}
      onClick={onClick}
    >
      <div className="goal-icon-wrapper">
        <div
          className="goal-icon"
          style={{
            color: iconColor,
            backgroundColor: `${iconColor}1f`,
          }}
          aria-hidden="true"
        >
          <Icon size={30} strokeWidth={1.8} />
        </div>
      </div>

      <div className="goal-card-content">
        <div className="goal-card-header">
          <div className="goal-info">
            <h3 title={goal.title}>{goal.title}</h3>

            {categoryLabel && (
              <span className="goal-category">{categoryLabel}</span>
            )}
          </div>

          {isCompleted && (
            <CheckCircle2 className="goal-completed-icon" size={21} />
          )}
        </div>

        {goal.description && (
          <p className="goal-description">{goal.description}</p>
        )}

        <div className="goal-progress">
          <div className="goal-progress-header">
            <span>Progresso</span>
            <strong>{progress}%</strong>
          </div>

          <div
            className="goal-progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Progresso obiettivo ${progress}%`}
          >
            <div
              className="goal-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="goal-card-footer">
          <div className="goal-date">
            <CalendarDays size={15} />
            <span>{goal.deadline || "Nessuna scadenza"}</span>
          </div>

          <span
            className={`goal-status ${
              isCompleted ? "completed" : "in-progress"
            }`}
          >
            {isCompleted ? "Completato" : "In corso"}
          </span>
        </div>

        <div className="goal-card-actions">
          <button
            type="button"
            className="edit-goal-button"
            onClick={handleEdit}
          >
            <Pencil size={16} />
            Modifica
          </button>

          <button
            type="button"
            className="delete-goal-button"
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

export default GoalCard;

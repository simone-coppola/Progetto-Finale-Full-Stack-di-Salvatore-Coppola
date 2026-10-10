import { useState } from "react";

import "./GoalForm.scss";
import { GOAL_ICON_OPTIONS } from "../../constants/icons";

function GoalForm({
  onSubmit,
  onCancel,
  goalToEdit = null,
}) {
  return (
    <GoalFormFields
      key={goalToEdit ? JSON.stringify(goalToEdit) : "new-goal"}
      onSubmit={onSubmit}
      onCancel={onCancel}
      goalToEdit={goalToEdit}
    />
  );
}

function GoalFormFields({ onSubmit, onCancel, goalToEdit }) {
  const [title, setTitle] = useState(goalToEdit?.title || "");
  const [category, setCategory] = useState(goalToEdit?.category || "");
  const [description, setDescription] = useState(goalToEdit?.description || "");
  const [deadline, setDeadline] = useState(goalToEdit?.deadline || "");
  const [progress, setProgress] = useState(goalToEdit?.progress ?? 0);
  const [icon, setIcon] = useState(goalToEdit?.icon || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const goalData = {
      title,
      category,
      description,
      deadline: deadline || null,
      progress: Number(progress),
      icon,
    };

    onSubmit(goalData);
  };

  return (
    <form
      className="goal-form"
      onSubmit={handleSubmit}
    >
      <div className="goal-form-group">
        <label htmlFor="goal-title">
          Titolo
        </label>

        <input
          id="goal-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />
      </div>

      <div className="goal-form-group">
        <label htmlFor="goal-category">
          Categoria
        </label>

        <select
          id="goal-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          required
        >
          <option value="">
            Seleziona una categoria
          </option>

          <option value="Backend">
            Backend
          </option>

          <option value="Frontend">
            Frontend
          </option>

          <option value="Database">
            Database
          </option>

          <option value="DevOps">
            DevOps
          </option>

          <option value="Other">
            Altro
          </option>
        </select>
      </div>

      <div className="goal-form-group">
        <label htmlFor="goal-description">
          Descrizione
        </label>

        <textarea
          id="goal-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />
      </div>

      <div className="goal-form-group">
        <label htmlFor="goal-deadline">
          Scadenza
        </label>

        <input
          id="goal-deadline"
          type="date"
          value={deadline || ""}
          onChange={(event) =>
            setDeadline(event.target.value)
          }
        />
      </div>

      <div className="goal-form-group">
        <div className="goal-progress-label">
          <label htmlFor="goal-progress">
            Progresso
          </label>

          <span>{progress}%</span>
        </div>

        <input
          id="goal-progress"
          className="goal-progress-range"
          type="range"
          min="0"
          max="100"
          step="5"
          value={progress}
          onChange={(event) =>
            setProgress(event.target.value)
          }
        />

        <div className="goal-range-values">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

        <div className="goal-form-group">
          <label>Icona</label>
          <div
            className="goal-icon-picker"
            role="radiogroup"
            aria-label="Scegli icona skill"
          >
            {GOAL_ICON_OPTIONS.map(({ value, label, icon: Icon, color }) => {
              const selected = icon === value;

              return (
                <button
                  type="button"
                  key={value}
                  className={`goal-icon-option ${selected ? "selected" : ""}`}
                  onClick={() => setIcon(value)}
                  aria-label={label}
                  aria-pressed={selected}
                  title={label}
                >
                  <Icon size={19} strokeWidth={1.9} style={{ color }} />
                </button>
              );
            })}
          </div>
        </div>

      <div className="goal-form-actions">
        <button
          type="button"
          className="goal-button goal-button-secondary"
          onClick={onCancel}
        >
          Annulla
        </button>

        <button
          type="submit"
          className="goal-button goal-button-primary"
        >
          {goalToEdit
            ? "Salva modifiche"
            : "Crea obiettivo"}
        </button>
      </div>
    </form>
  );
}

export default GoalForm;

import { useState } from "react";
import { Save, X } from "lucide-react";

import { SKILL_ICON_OPTIONS } from "../../constants/icons";
import "./SkillForm.scss";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Altro",
];

function SkillForm({ initialSkill = null, onSubmit, onCancel }) {
  const [name, setName] = useState(initialSkill?.name ?? "");

  const [category, setCategory] = useState(
    initialSkill?.category ?? "Frontend",
  );

  const [level, setLevel] = useState(Number(initialSkill?.level) || 0);

  const [experience, setExperience] = useState(
    Number(initialSkill?.experience) || 0,
  );

  const [notes, setNotes] = useState(initialSkill?.notes ?? "");

  const [icon, setIcon] = useState(initialSkill?.icon ?? "code");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit({
      name: trimmedName,
      category,
      level: Number(level),
      experience: Number(experience),
      notes: notes.trim(),
      icon,
    });
  };

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      <header className="skill-form-header">
        <div>
          <h2>{initialSkill ? "Modifica skill" : "Nuova skill"}</h2>

          <p>Aggiungi una competenza e definisci il tuo livello.</p>
        </div>
      </header>

      <div className="skill-form-body">
        {/* =====================================
            NOME
            ===================================== */}

        <div className="skill-form-group">
          <label htmlFor="skill-name">Nome skill</label>

          <input
            id="skill-name"
            type="text"
            placeholder="Es. React, Java, SQL..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        {/* =====================================
            CATEGORIA
            ===================================== */}

        <div className="skill-form-group">
          <label htmlFor="skill-category">Categoria</label>

          <select
            id="skill-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* =====================================
            ICONA
            ===================================== */}

        <div className="skill-form-group">
          <label>Icona</label>

          <div
            className="skill-icon-picker"
            role="radiogroup"
            aria-label="Scegli icona skill"
          >
            {SKILL_ICON_OPTIONS.map(({ value, label, icon: Icon, color }) => {
              const selected = icon === value;

              return (
                <button
                  type="button"
                  key={value}
                  className={`skill-icon-option ${selected ? "selected" : ""}`}
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

        {/* =====================================
            LIVELLO
            ===================================== */}

        <div className="skill-form-group">
          <div className="skill-level-label">
            <label htmlFor="skill-level">Livello</label>

            <span>{level}%</span>
          </div>

          <input
            id="skill-level"
            className="skill-level-range"
            type="range"
            min="0"
            max="100"
            step="5"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          />

          <div className="skill-range-values">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* =====================================
            ESPERIENZA
            ===================================== */}

        <div className="skill-form-group">
          <label htmlFor="skill-experience">Esperienza</label>

          <input
            id="skill-experience"
            type="number"
            min="0"
            placeholder="Mesi"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
          />
        </div>

        {/* =====================================
            NOTE
            ===================================== */}

        <div className="skill-form-group">
          <label htmlFor="skill-notes">Note</label>

          <textarea
            id="skill-notes"
            rows="4"
            placeholder="Aggiungi delle note..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>

      {/* =====================================
          ACTIONS
          ===================================== */}

      <div className="skill-form-actions">
        <button
          type="button"
          className="skill-button skill-button-secondary"
          onClick={onCancel}
        >
          <X size={17} />
          Annulla
        </button>

        <button type="submit" className="skill-button skill-button-primary">
          <Save size={17} />

          {initialSkill ? "Salva modifiche" : "Salva skill"}
        </button>
      </div>
    </form>
  );
}

export default SkillForm;

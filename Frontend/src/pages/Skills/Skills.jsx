import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Code2, CircleDot, CheckCircle2 } from "lucide-react";

import SkillCard from "../../components/SkillCard/SkillCard";
import SkillForm from "../../components/SkillForm/SkillForm";

import {
  getSkillsApi,
  createSkillApi,
  updateSkillApi,
  deleteSkillApi,
} from "../../services/api";

import "./Skills.scss";

function Skills() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") ?? "")
    .trim()
    .toLocaleLowerCase("it");

  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tutte");
  const [skills, setSkills] = useState([]);
  const [skillToEdit, setSkillToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSkillsApi();
        setSkills(data);
      } catch (error) {
        setError(error.message || "Errore durante il caricamento delle skill");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleSkillSubmit = async (skillData) => {
    try {
      setError("");

      if (skillToEdit) {
        const updatedSkill = await updateSkillApi(skillToEdit.id, skillData);

        setSkills((currentSkills) =>
          currentSkills.map((skill) =>
            skill.id === skillToEdit.id ? updatedSkill : skill,
          ),
        );

        setSkillToEdit(null);
        setShowForm(false);
        return;
      }

      const createdSkill = await createSkillApi(skillData);
      setSkills((currentSkills) => [...currentSkills, createdSkill]);
      setShowForm(false);
    } catch (error) {
      setError(error.message || "Errore durante il salvataggio della skill");
    }
  };

  const handleEditSkill = (skill) => {
    setSkillToEdit(skill);
    setShowForm(true);
    setError("");
  };

  const handleDeleteSkill = async (skillId) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questa skill?",
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteSkillApi(skillId);

      setSkills((currentSkills) =>
        currentSkills.filter((skill) => skill.id !== skillId),
      );
    } catch (error) {
      setError(error.message || "Errore durante l'eliminazione della skill");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSkillToEdit(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      handleCancel();
      return;
    }

    setSkillToEdit(null);
    setShowForm(true);
  };

  const clearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    setSearchParams(nextParams);
  };

  const filters = [
    "Tutte",
    "In corso",
    "Completate",
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Tools",
    "Altro",
  ];

  const matchesFilter = (skill) => {
    const level = Number(skill.level) || 0;

    if (activeFilter === "Tutte") return true;
    if (activeFilter === "In corso") return level < 100;
    if (activeFilter === "Completate") return level >= 100;

    return skill.category === activeFilter;
  };

  const matchesSearch = (skill) => {
    if (!searchTerm) return true;

    const searchableText = [skill.name, skill.category, skill.notes]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("it");

    return searchableText.includes(searchTerm);
  };

  const filteredSkills = skills.filter(
    (skill) => matchesFilter(skill) && matchesSearch(skill),
  );

  return (
    <div className="skills-page">
      <header className="skills-header">
        <div className="skills-title">
          <div className="skills-title-icon">
            <Code2 size={25} />
          </div>

          <div>
            <h1>Le tue Skill</h1>
            <p>Aggiungi le tue competenze e monitora il tuo livello.</p>
          </div>
        </div>

        <div className="add-skill-wrapper">
          <button
            type="button"
            className={`new-skill-button ${showForm ? "active" : ""}`}
            onClick={handleToggleForm}
            aria-expanded={showForm}
          >
            <Plus
              size={18}
              className={showForm ? "plus-icon rotate" : "plus-icon"}
            />
            {showForm ? "Chiudi" : "Nuova skill"}
          </button>

          {showForm && (
            <div className="skill-form-container">
              <SkillForm
                initialSkill={skillToEdit}
                onSubmit={handleSkillSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </header>

      <div className="skills-filters">
        {filters.map((filter) => {
          const count =
            filter === "Tutte"
              ? skills.length
              : filter === "In corso"
                ? skills.filter((skill) => Number(skill.level) < 100).length
                : filter === "Completate"
                  ? skills.filter((skill) => Number(skill.level) >= 100).length
                  : skills.filter((skill) => skill.category === filter).length;

          return (
            <button
              type="button"
              key={filter}
              className={`skill-filter ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      {searchTerm && (
        <p className="skills-search-summary" aria-live="polite">
          Risultati per: <strong>{searchParams.get("search")}</strong>
        </p>
      )}

      {loading && (
        <section className="empty-skills">
          <p>Caricamento delle skill...</p>
        </section>
      )}

      {!loading && error && (
        <section className="empty-skills">
          <h2>Errore</h2>
          <p>{error}</p>
        </section>
      )}

      {!loading && !error && (
        <>
          {filteredSkills.length > 0 ? (
            <section className="skills-content">
              <div className="skills-grid">
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onDelete={handleDeleteSkill}
                    onEdit={handleEditSkill}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="empty-skills">
              <div className="empty-skills-icon">
                {activeFilter === "Completate" ? (
                  <CheckCircle2 size={28} />
                ) : (
                  <CircleDot size={28} />
                )}
              </div>

              <h2>Nessuna skill trovata</h2>
              <p>
                {searchTerm
                  ? `Nessuna skill corrisponde alla ricerca "${searchParams.get("search")}".`
                  : "Non ci sono skill che corrispondono al filtro selezionato."}
              </p>

              {searchTerm ? (
                <button
                  type="button"
                  className="empty-skills-button"
                  onClick={clearSearch}
                >
                  Rimuovi ricerca
                </button>
              ) : (
                <button
                  type="button"
                  className="empty-skills-button"
                  onClick={() => {
                    setActiveFilter("Tutte");
                    setSkillToEdit(null);
                    setShowForm(true);
                  }}
                >
                  <Plus size={18} />
                  Aggiungi skill
                </button>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Skills;

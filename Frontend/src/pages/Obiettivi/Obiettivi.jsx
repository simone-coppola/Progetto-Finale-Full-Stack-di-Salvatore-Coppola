import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Target, CircleDot, CheckCircle2 } from "lucide-react";

import GoalCard from "../../components/GoalCard/GoalCard";
import GoalForm from "../../components/GoalForm/GoalForm";

import {
  getGoalsApi,
  createGoalApi,
  updateGoalApi,
  deleteGoalApi,
} from "../../services/api";

import "./Obiettivi.scss";

function Obiettivi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") ?? "")
    .trim()
    .toLocaleLowerCase("it");

  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tutti");
  const [goals, setGoals] = useState([]);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getGoalsApi();
        setGoals(data);
      } catch (error) {
        setError(error.message || "Errore durante il caricamento degli obiettivi");
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  const handleGoalSubmit = async (goalData) => {
    try {
      setError("");

      if (goalToEdit) {
        const updatedGoal = await updateGoalApi(goalToEdit.id, goalData);

        setGoals((currentGoals) =>
          currentGoals.map((goal) =>
            goal.id === goalToEdit.id ? updatedGoal : goal,
          ),
        );

        setGoalToEdit(null);
        setShowForm(false);
        return;
      }

      const createdGoal = await createGoalApi(goalData);
      setGoals((currentGoals) => [...currentGoals, createdGoal]);
      setShowForm(false);
    } catch (error) {
      setError(error.message || "Errore durante il salvataggio dell'obiettivo");
    }
  };

  const handleEditGoal = (goal) => {
    setGoalToEdit(goal);
    setShowForm(true);
    setError("");
  };

  const handleDeleteGoal = async (goalId) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questo obiettivo?",
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteGoalApi(goalId);

      setGoals((currentGoals) =>
        currentGoals.filter((goal) => goal.id !== goalId),
      );
    } catch (error) {
      setError(error.message || "Errore durante l'eliminazione dell'obiettivo");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setGoalToEdit(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      handleCancel();
      return;
    }

    setGoalToEdit(null);
    setShowForm(true);
  };

  const clearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    setSearchParams(nextParams);
  };

  const filters = [
    "Tutti",
    "In corso",
    "Completati",
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Altro",
  ];

  const getCategory = (goal) =>
    goal.category === "Other" ? "Altro" : goal.category;

  const matchesFilter = (goal) => {
    const progress = Number(goal.progress) || 0;

    if (activeFilter === "Tutti") return true;
    if (activeFilter === "In corso") return progress < 100;
    if (activeFilter === "Completati") return progress >= 100;

    return getCategory(goal) === activeFilter;
  };

  const matchesSearch = (goal) => {
    if (!searchTerm) return true;

    const searchableText = [
      goal.title,
      getCategory(goal),
      goal.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("it");

    return searchableText.includes(searchTerm);
  };

  const filteredGoals = goals.filter(
    (goal) => matchesFilter(goal) && matchesSearch(goal),
  );

  return (
    <div className="goals-page">
      <header className="goals-header">
        <div className="goals-title">
          <div className="goals-title-icon">
            <Target size={25} />
          </div>

          <div>
            <h1>I tuoi Obiettivi</h1>
            <p>Definisci i tuoi obiettivi e monitora i tuoi progressi.</p>
          </div>
        </div>

        <div className="add-goal-wrapper">
          <button
            type="button"
            className={`new-goal-button ${showForm ? "active" : ""}`}
            onClick={handleToggleForm}
            aria-expanded={showForm}
          >
            <Plus
              size={18}
              className={showForm ? "plus-icon rotate" : "plus-icon"}
            />
            {showForm ? "Chiudi" : "Nuovo obiettivo"}
          </button>

          {showForm && (
            <div className="goal-form-container">
              <GoalForm
                goalToEdit={goalToEdit}
                onSubmit={handleGoalSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </header>

      <div className="goals-filters">
        {filters.map((filter) => {
          const count =
            filter === "Tutti"
              ? goals.length
              : filter === "In corso"
                ? goals.filter((goal) => Number(goal.progress) < 100).length
                : filter === "Completati"
                  ? goals.filter((goal) => Number(goal.progress) >= 100).length
                  : goals.filter((goal) => getCategory(goal) === filter).length;

          return (
            <button
              type="button"
              key={filter}
              className={`goal-filter ${
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
        <p className="goals-search-summary" aria-live="polite">
          Risultati per: <strong>{searchParams.get("search")}</strong>
        </p>
      )}

      {loading && (
        <section className="empty-goals">
          <p>Caricamento degli obiettivi...</p>
        </section>
      )}

      {!loading && error && (
        <section className="empty-goals">
          <h2>Errore</h2>
          <p>{error}</p>
        </section>
      )}

      {!loading && !error && (
        <>
          {filteredGoals.length > 0 ? (
            <section className="goals-content">
              <div className="goals-grid">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onDelete={handleDeleteGoal}
                    onEdit={handleEditGoal}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="empty-goals">
              <div className="empty-goals-icon">
                {activeFilter === "Completati" ? (
                  <CheckCircle2 size={28} />
                ) : (
                  <CircleDot size={28} />
                )}
              </div>

              <h2>Nessun obiettivo trovato</h2>
              <p>
                {searchTerm
                  ? `Nessun obiettivo corrisponde alla ricerca "${searchParams.get("search")}".`
                  : "Non ci sono obiettivi che corrispondono al filtro selezionato."}
              </p>

              {searchTerm ? (
                <button
                  type="button"
                  className="empty-goals-button"
                  onClick={clearSearch}
                >
                  Rimuovi ricerca
                </button>
              ) : (
                <button
                  type="button"
                  className="empty-goals-button"
                  onClick={() => {
                    setActiveFilter("Tutti");
                    setGoalToEdit(null);
                    setShowForm(true);
                  }}
                >
                  <Plus size={18} />
                  Aggiungi obiettivo
                </button>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Obiettivi;

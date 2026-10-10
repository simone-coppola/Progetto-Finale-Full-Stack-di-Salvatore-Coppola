import { useEffect, useMemo, useState } from "react";
import {
  Award,
  Brain,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

import { GOAL_ICONS, SKILL_ICONS, GOAL_ICON_COLORS, SKILL_ICON_COLORS } from "../../constants/icons";
import { getGoalsApi, getSkillsApi } from "../../services/api";

import "./Progressi.scss";

function Progressi() {
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProgressData = async () => {
      try {
        setLoading(true);
        setError("");

        const [skillsData, goalsData] = await Promise.all([
          getSkillsApi(),
          getGoalsApi(),
        ]);

        if (isMounted) {
          setSkills(Array.isArray(skillsData) ? skillsData : []);
          setGoals(Array.isArray(goalsData) ? goalsData : []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError.message || "Errore durante il caricamento dei progressi",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProgressData();

    return () => {
      isMounted = false;
    };
  }, []);

  const skillStats = useMemo(() => {
    const averageLevel = skills.length
      ? Math.round(
          skills.reduce(
            (total, skill) => total + (Number(skill.level) || 0),
            0,
          ) / skills.length,
        )
      : 0;

    const completedCount = skills.filter(
      (skill) => Number(skill.level) >= 100,
    ).length;

    const bestSkill = skills.reduce((best, skill) => {
      if (!best || Number(skill.level) > Number(best.level)) {
        return skill;
      }

      return best;
    }, null);

    const categoryGroups = skills.reduce((groups, skill) => {
      const category = skill.category?.trim() || "Altro";

      if (!groups[category]) {
        groups[category] = { name: category, count: 0 };
      }

      groups[category].count += 1;
      return groups;
    }, {});

    const categories = Object.values(categoryGroups)
      .map((category) => ({
        ...category,
        percentage: Math.round((category.count / skills.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      averageLevel,
      completedCount,
      bestSkill,
      categories,
    };
  }, [skills]);

  const goalStats = useMemo(() => {
    const averageProgress = goals.length
      ? Math.round(
          goals.reduce(
            (total, goal) => total + (Number(goal.progress) || 0),
            0,
          ) / goals.length,
        )
      : 0;

    const completedCount = goals.filter(
      (goal) => Number(goal.progress) >= 100,
    ).length;

    const activeGoals = goals
      .filter((goal) => Number(goal.progress) < 100)
      .sort((a, b) => {
        const deadlineA = a.deadline
          ? new Date(`${a.deadline}T00:00:00`).getTime()
          : Infinity;
        const deadlineB = b.deadline
          ? new Date(`${b.deadline}T00:00:00`).getTime()
          : Infinity;

        return deadlineA - deadlineB;
      })
      .slice(0, 5);

    return {
      averageProgress,
      completedCount,
      activeGoals,
    };
  }, [goals]);

  const renderProgressBar = (value, label) => {
    const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

    return (
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className="progress-fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="progress-page">
        <section className="progress-state-card" aria-live="polite">
          <p>Caricamento dei progressi...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-page">
        <section className="progress-state-card progress-error" role="alert">
          <h1>Impossibile caricare i progressi</h1>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="progress-page">
      <header className="progress-header">
        <div>
          <h1>I tuoi Progressi</h1>
          <p>Riepilogo aggiornato di skill e obiettivi.</p>
        </div>
      </header>

      <section className="progress-stats">
        <article className="stat-card">
          <div className="stat-icon blue">
            <Brain size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">Skill monitorate</span>
            <strong>{skills.length}</strong>
            <span className="stat-description">
              competenze nel tuo profilo
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">Livello medio skill</span>
            <strong>{skillStats.averageLevel}%</strong>
            <span className="stat-description">
              {skillStats.completedCount} completate
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <Award size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">Skill più sviluppata</span>
            <strong className="stat-name">
              {skillStats.bestSkill?.name ?? "—"}
            </strong>
            <span className="stat-description">
              {skillStats.bestSkill
                ? `${Number(skillStats.bestSkill.level) || 0}% di livello`
                : "Aggiungi una skill per iniziare"}
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <Target size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">Obiettivi completati</span>
            <strong>
              {goalStats.completedCount}/{goals.length}
            </strong>
            <span className="stat-description">
              Progresso medio {goalStats.averageProgress}%
            </span>
          </div>
        </article>
      </section>

      <section className="progress-panels">
        <article className="progress-card">
          <div className="card-header">
            <div>
              <h2>Skill per categoria</h2>
              <p>Distribuzione delle competenze salvate.</p>
            </div>

            <Brain size={20} aria-hidden="true" />
          </div>

          {skillStats.categories.length ? (
            <div className="category-list">
              {skillStats.categories.map((category, index) => (
                <div className="category-item" key={category.name}>
                  <div className="category-heading">
                    <span className="category-name">
                      <span
                        className={`category-dot category-color-${index % 4}`}
                      />
                      {category.name}
                    </span>

                    <strong>{category.count}</strong>
                  </div>

                  {renderProgressBar(
                    category.percentage,
                    `${category.name}: ${category.percentage}% delle skill`,
                  )}

                  <span className="category-percentage">
                    {category.percentage}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="progress-empty">
              <p>Non hai ancora aggiunto skill.</p>
            </div>
          )}
        </article>

        <article className="progress-card">
          <div className="card-header">
            <div>
              <h2>Obiettivi attivi</h2>
              <p>
                {goalStats.activeGoals.length
                  ? "Le prossime attività da tenere d'occhio."
                  : "Non hai obiettivi ancora in corso."}
              </p>
            </div>

            <CheckCircle2 size={20} aria-hidden="true" />
          </div>

          {goalStats.activeGoals.length ? (
            <div className="goal-progress-list">
              {goalStats.activeGoals.map((goal) => {
                const progress = Math.min(
                  Math.max(Number(goal.progress) || 0, 0),
                  100,
                );
                const GoalIcon = GOAL_ICONS[goal.icon] || Target;

                return (
                  <div className="goal-progress-item" key={goal.id}>
                    <div className="goal-progress-heading">
                      <div className="goal-progress-title">
                        <span
                          className="progress-goal-icon"
                          aria-hidden="true"
                        >
                          <GoalIcon size={17} style={{ color: GOAL_ICON_COLORS[goal.icon] }} />
                        </span>

                        <div>
                          <strong>{goal.title}</strong>
                          <span>{goal.category || "Altro"}</span>
                        </div>
                      </div>

                      <strong>{progress}%</strong>
                    </div>

                    {renderProgressBar(
                      progress,
                      `Progresso obiettivo ${goal.title}`,
                    )}

                    <span className="goal-deadline">
                      {goal.deadline
                        ? `Scadenza: ${goal.deadline}`
                        : "Nessuna scadenza"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="progress-empty">
              <p>Crea un obiettivo per monitorarne l'avanzamento.</p>
            </div>
          )}
        </article>
      </section>

      <section className="progress-card skills-progress-card">
        <div className="card-header">
          <div>
            <h2>Livello delle skill</h2>
            <p>Confronto dei livelli attuali delle tue competenze.</p>
          </div>
        </div>

        {skills.length ? (
          <div className="skills-table">
            <div className="table-header">
              <span>Skill</span>
              <span>Categoria</span>
              <span>Livello</span>
            </div>

            {skills.map((skill) => {
              const level = Math.min(
                Math.max(Number(skill.level) || 0, 0),
                100,
              );
              const SkillIcon = SKILL_ICONS[skill.icon] || Brain;

              return (
                <div className="skill-row" key={skill.id}>
                  <div className="skill-name">
                    <span className="progress-skill-icon" aria-hidden="true">
                      <SkillIcon size={17} color={SKILL_ICON_COLORS[skill.icon]} />
                    </span>

                    <strong>{skill.name || "Skill senza nome"}</strong>
                  </div>

                  <span className="skill-category">
                    {skill.category || "Altro"}
                  </span>

                  <div className="skill-level">
                    {renderProgressBar(
                      level,
                      `Livello di ${skill.name || "skill"}`,
                    )}
                    <strong>{level}%</strong>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="progress-empty">
            <p>Non hai ancora skill da visualizzare.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Progressi;
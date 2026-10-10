import {
  Code2,
  Target,
  CheckCircle2,
  TrendingUp,
  Flame,
  ArrowRight,
} from "lucide-react";

import { useState, useEffect } from "react";

import { getSkillsApi, getGoalsApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import SkillCard from "../../components/SkillCard/SkillCard";
import GoalCard from "../../components/GoalCard/GoalCard";

import "./Dashboard.scss";

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getSkillsApi()
      .then(setSkills)
      .catch((error) => console.error("Errore nel caricamento skill:", error));
  }, []);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoalsApi()
      .then(setGoals)
      .catch((error) => console.error("Errore nel caricamento goal:", error));
  }, []);

  const completedSkills = skills.filter(
    (skill) => Number(skill.level) === 100,
  ).length;

  const completedGoals = goals.filter(
    (goal) => Number(goal.progress) === 100,
  ).length;

  const overallSkillProgress = skills.length
    ? Math.round(
        skills.reduce((sum, skill) => sum + (Number(skill.level) || 0), 0) /
          skills.length,
      )
    : 0;

  const overallGoalProgress = goals.length
    ? Math.round(
        goals.reduce((sum, goal) => sum + (Number(goal.progress) || 0), 0) /
          goals.length,
      )
    : 0;

  const progressValues = [];

  if (skills.length > 0) progressValues.push(overallSkillProgress);
  if (goals.length > 0) progressValues.push(overallGoalProgress);

  const overallProgress = progressValues.length
    ? Math.round(
        progressValues.reduce((sum, value) => sum + value, 0) /
          progressValues.length,
      )
    : 0;

  const skillsLegend = Object.values(
    skills.reduce((groups, skill) => {
      const category = skill.category?.trim() || "Altro";

      if (!groups[category]) {
        groups[category] = {
          category,
          totalLevel: 0,
          count: 0,
        };
      }

      groups[category].totalLevel += Number(skill.level) || 0;
      groups[category].count += 1;

      return groups;
    }, {}),
  ).map(({ category, totalLevel, count }) => ({
    category,
    level: Math.round(totalLevel / count),
  }));

  const goalsLegend = Object.values(
    goals.reduce((groups, goal) => {
      const category =
        goal.category?.trim() === "Other" || !goal.category?.trim()
          ? "Altro"
          : goal.category.trim();

      if (!groups[category]) {
        groups[category] = {
          category,
          totalProgress: 0,
          count: 0,
        };
      }

      groups[category].totalProgress += Number(goal.progress) || 0;
      groups[category].count += 1;

      return groups;
    }, {}),
  ).map(({ category, totalProgress, count }) => ({
    category,
    progress: Math.round(totalProgress / count),
  }));

  const LEGEND_COLORS = [
    "#16a34a", 
    "#dc2626", 
    "#6b7280",
    "#2563eb",
    "#eab308",
    "#9333ea",
  ];

  const categories = [...new Set(skillsLegend.map((item) => item.category))]
    .filter(Boolean)
    .sort();

  const colorsByCategory = Object.fromEntries(
    categories.map((category, index) => [category, LEGEND_COLORS[index]]),
  );

  return (
    <div className="dashboard">
      {/* =====================================
          WELCOME
          ===================================== */}

      <section className="dashboard-welcome">
        <div>
          <h1>Ciao, {user?.username || "Simone"}! 👋</h1>

          <p>Ecco una panoramica dei tuoi progressi!</p>
        </div>
      </section>

      {/* =====================================
          STATISTICHE
          ===================================== */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Code2 size={22} />
          </div>

          <div className="stat-content">
            <span>Skill totali</span>
            <strong>{skills.length}</strong>
            <small>Competenze monitorate</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Flame size={22} />
          </div>

          <div className="stat-content">
            <span>Skill Completate</span>
            <strong>
              {completedSkills}/{skills.length}
            </strong>
            <small>Continua cosi!</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Target size={22} />
          </div>

          <div className="stat-content">
            <span>Obiettivi totali</span>
            <strong>{goals.length}</strong>
            <small>Continua cosi!</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={22} />
          </div>

          <div className="stat-content">
            <span>Obiettivi completati</span>
            <strong>
              {completedGoals}/{goals.length}
            </strong>
            <small>Ottimo lavoro!</small>
          </div>
        </div>
      </section>

      {/* =====================================
          PANORAMICA
          ===================================== */}

      <section className="dashboard-overview">
        {/* LIVELLO MEDIO DELLE SKILL */}
        <div className="overview-card skill-level-overview">
          <div className="overview-header">
            <div>
              <h2>Progresso skill</h2>
              <p>Livello medio delle tue skill.</p>
            </div>

            <Code2 size={20} />
          </div>

          <div className="overall-progress">
            <div className="progress-circle">
              <svg
                viewBox="0 0 120 120"
                className="progress-svg"
                aria-hidden="true"
              >
                <circle
                  className="progress-circle-background"
                  cx="60"
                  cy="60"
                  r="48"
                />
                <circle
                  className="progress-circle-value"
                  cx="60"
                  cy="60"
                  r="48"
                  style={{
                    "--progress":
                      Math.min(
                        Math.max(Number(overallSkillProgress) || 0, 0),
                        100,
                      ) / 100,
                  }}
                />
              </svg>

              <div className="progress-circle-text">
                <strong>{overallSkillProgress}%</strong>
                <span>Media skill</span>
              </div>
            </div>

            <div className="progress-legend">
              {skillsLegend?.length ? (
                skillsLegend.slice(0, 3).map((skill) => (
                  <div className="legend-item" key={skill.id ?? skill.category}>
                    <span
                      className="legend-dot"
                      style={{
                        backgroundColor: colorsByCategory[skill.category],
                      }}
                    />
                    <span>{skill.category}</span>
                    <strong>{Number(skill.level) || 0}%</strong>
                  </div>
                ))
              ) : (
                <p className="legend-empty">Nessuna skill inserita.</p>
              )}
            </div>
          </div>
          <a href="/skills">
            Vedi tutte
            <ArrowRight size={15} />
          </a>
        </div>

        {/* PROGRESSO MEDIO DEGLI OBIETTIVI */}
        <div className="overview-card goal-level-overview">
          <div className="overview-header">
            <div>
              <h2>Progresso obiettivi</h2>
              <p>Progresso medio dei tuoi obiettivi.</p>
            </div>

            <Target size={20} />
          </div>

          <div className="overall-progress">
            <div className="progress-circle">
              <svg
                viewBox="0 0 120 120"
                className="progress-svg"
                aria-hidden="true"
              >
                <circle
                  className="progress-circle-background"
                  cx="60"
                  cy="60"
                  r="48"
                />
                <circle
                  className="progress-circle-value"
                  cx="60"
                  cy="60"
                  r="48"
                  style={{
                    "--progress":
                      Math.min(
                        Math.max(Number(overallGoalProgress) || 0, 0),
                        100,
                      ) / 100,
                  }}
                />
              </svg>

              <div className="progress-circle-text">
                <strong>{overallGoalProgress}%</strong>
                <span>Media obiettivi</span>
              </div>
            </div>

            <div className="progress-legend">
              {goalsLegend?.length ? (
                goalsLegend.slice(0, 3).map((goal) => (
                  <div className="legend-item" key={goal.id ?? goal.category}>
                    <span
                      className="legend-dot"
                      style={{
                        backgroundColor: colorsByCategory[goal.category],
                      }}
                    />
                    <span>{goal.category}</span>
                    <strong>{Number(goal.progress) || 0}%</strong>
                  </div>
                ))
              ) : (
                <p className="legend-empty">Nessun obiettivo inserito.</p>
              )}
            </div>
          </div>

          <a href="/goals">
            Vedi tutti
            <ArrowRight size={15} />
          </a>
        </div>

        {/* PROGRESSO COMPLESSIVO */}
        <div className="overview-card progress-overview">
          <div className="overview-header">
            <div>
              <h2>Progresso complessivo</h2>
              <p>Media dei progressi di skill e obiettivi.</p>
            </div>
            <TrendingUp size={20} aria-hidden="true" />
          </div>

          {skills.length === 0 && goals.length === 0 ? (
            <p className="progress-empty">
              Aggiungi skill o obiettivi per vedere i tuoi progressi.
            </p>
          ) : (
            <div className="overall-progress">
              <div
                className="progress-circle"
                role="progressbar"
                aria-label="Progresso complessivo"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={overallProgress}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="progress-svg"
                  aria-hidden="true"
                >
                  <circle
                    className="progress-circle-background"
                    cx="60"
                    cy="60"
                    r="48"
                  />
                  <circle
                    className="progress-circle-value"
                    cx="60"
                    cy="60"
                    r="48"
                    style={{
                      "--progress":
                        Math.min(
                          Math.max(Number(overallProgress) || 0, 0),
                          100,
                        ) / 100,
                    }}
                  />
                </svg>

                <div className="progress-circle-text">
                  <strong>{overallProgress}%</strong>
                  <span>Complessivo</span>
                </div>
              </div>

              <div className="overall-breakdown">
                <div className="overall-breakdown-item">
                  <span className="breakdown-indicator skills-indicator" />
                  <span className="breakdown-label">Progresso Skill</span>
                  <strong>
                    {skills.length ? `${overallSkillProgress}%` : "—"}
                  </strong>
                </div>

                <div className="overall-breakdown-item">
                  <span className="breakdown-indicator goals-indicator" />
                  <span className="breakdown-label">Progresso Obiettivi</span>
                  <strong>
                    {goals.length ? `${overallGoalProgress}%` : "—"}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          SKILLS RECENTI
          ===================================== */}

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Skills</h2>

            <p>Le competenze che stai sviluppando.</p>
          </div>

          <a href="/skills">
            Vedi tutte
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="dashboard-skills-grid">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* =====================================
          OBIETTIVI RECENTI
          ===================================== */}

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Obiettivi</h2>

            <p>I tuoi obiettivi di apprendimento.</p>
          </div>

          <a href="/goals">
            Vedi tutti
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="dashboard-goals-grid">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

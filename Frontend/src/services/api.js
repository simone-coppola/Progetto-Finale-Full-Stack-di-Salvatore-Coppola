const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const API_URL = `${BASE_URL}/api`;

// ====================
// UTILITY
// ====================

export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse(response, defaultErrorMessage) {
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message || text || defaultErrorMessage
    );
  }

  return data;
}

// ====================
// AUTH API
// ====================

export async function registerApi(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  return parseResponse(
    response,
    "Errore durante la registrazione"
  );
}

export async function loginApi(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return parseResponse(
    response,
    "Credenziali non valide"
  );
}

export async function getUserProfileApi() {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(
    response,
    "Errore durante il recupero del profilo utente"
  );
}

// ====================
// GOAL API
// ====================

export async function getGoalsApi() {
  const response = await fetch(`${BASE_URL}/goals`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(
    response,
    "Errore durante il recupero dei goal"
  );
}

export async function createGoalApi(goalData) {
  const response = await fetch(`${BASE_URL}/goals`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(goalData),
  });

  return parseResponse(
    response,
    "Errore durante la creazione del goal"
  );
}

export async function updateGoalApi(goalId, goalData) {
  const response = await fetch(`${BASE_URL}/goals/${goalId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(goalData),
  });

  return parseResponse(
    response,
    "Errore durante l'aggiornamento del goal"
  );
}

export async function deleteGoalApi(goalId) {
  const response = await fetch(`${BASE_URL}/goals/${goalId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(
    response,
    "Errore durante la cancellazione del goal"
  );
}

// ====================
// SKILL API
// ====================

export async function getSkillsApi() {
  const response = await fetch(`${BASE_URL}/skills`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(
    response,
    "Errore durante il recupero delle skills"
  );
}

export async function createSkillApi(skillData) {
  const response = await fetch(`${BASE_URL}/skills`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData),
  });

  return parseResponse(
    response,
    "Errore durante la creazione della skill"
  );
}

export async function updateSkillApi(skillId, skillData) {
  const response = await fetch(`${BASE_URL}/skills/${skillId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData),
  });

  return parseResponse(
    response,
    "Errore durante l'aggiornamento della skill"
  );
}

export async function deleteSkillApi(skillId) {
  const response = await fetch(`${BASE_URL}/skills/${skillId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return parseResponse(
    response,
    "Errore durante la cancellazione della skill"
  );
}
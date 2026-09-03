/**
 * Centralized API client for NAVORA AI
 */

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('navora_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    const error = (data && data.error) || 'An unexpected error occurred';
    throw new Error(error);
  }
  return data;
}

export const api = {
  // Auth
  signup: async (payload) => {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  login: async (payload) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  demoLogin: async () => {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Planner
  generatePlan: async (preferences) => {
    const res = await fetch(`${API_BASE}/planner/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(preferences)
    });
    return handleResponse(res);
  },

  // Plans Management
  savePlan: async (planData) => {
    const res = await fetch(`${API_BASE}/plans/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(planData)
    });
    return handleResponse(res);
  },

  getPlans: async () => {
    const res = await fetch(`${API_BASE}/plans`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  getPlanById: async (id) => {
    const res = await fetch(`${API_BASE}/plans/${id}`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  deletePlan: async (id) => {
    const res = await fetch(`${API_BASE}/plans/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  toggleFavourite: async (id) => {
    const res = await fetch(`${API_BASE}/plans/${id}/favourite`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  toggleComplete: async (id) => {
    const res = await fetch(`${API_BASE}/plans/${id}/complete`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  updateProfile: async (payload) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  }
};

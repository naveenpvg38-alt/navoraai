/**
 * Centralized API client for NAVORA AI
 */

const API_BASE = (() => {
  if (typeof window !== 'undefined' && window.location.port && window.location.port !== '5000') {
    const hostname = window.location.hostname || 'localhost';
    return `http://${hostname}:5000/api`;
  }
  return '/api';
})();

function getAuthHeader() {
  const token = localStorage.getItem('navora_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  let data = null;
  const contentType = res.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text ? { error: text } : null;
      }
    }
  } catch (err) {
    data = null;
  }

  if (!res.ok) {
    const error =
      (data && (data.error || data.message)) ||
      (res.status === 401
        ? 'Invalid email or password. If you do not have an account, please click "Create Account".'
        : `Request failed with status ${res.status}`);
    throw new Error(error);
  }
  return data || {};
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

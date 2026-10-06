const API_BASE_URL = 'http://localhost:3000/api';

const apiRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  requiresAuth = false
) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      config
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
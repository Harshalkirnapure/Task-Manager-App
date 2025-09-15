const API_BASE = import.meta.env.VITE_API_URL || 'https://task-manager-app-202i.onrender.com' ;


async function request(path, options = {}){
  const headers = options.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export const authRegister = (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const authLogin = (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const getTasks = () => request('/tasks');
export const addTask = (payload) => request('/tasks', { method: 'POST', body: JSON.stringify(payload) });
export const updateTask = (id, payload) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });

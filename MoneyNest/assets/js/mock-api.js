/**
 * ================================================
 * MONEY NEST - MOCK API
 * ================================================
 * Simula uma REST API usando json-server ou localStorage como fallback.
 * Endpoints:
 * - GET    /api/records     - Listar todos os registos
 * - POST   /api/records     - Criar novo registo
 * - PUT    /api/records/:id - Atualizar registo
 * - DELETE /api/records/:id - Eliminar registo
 * - GET    /api/todos       - Listar todos os TODOs
 * - POST   /api/todos       - Criar TODO
 * - PUT    /api/todos/:id   - Atualizar TODO
 * - DELETE /api/todos/:id   - Eliminar TODO
 * - GET    /api/settings    - Obter definições
 * - PUT    /api/settings   - Atualizar definições
 */

const API_BASE = 'http://localhost:3000';
const USE_MOCK_API = true; // Set to true para usar json-server

/**
 * Fetch com fallback para localStorage
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  try {
    // Tentar chamar a API real
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    // Se falhar, usar localStorage como fallback
    console.log('[MockAPI] Usando fallback localStorage');
    return apiFallback(endpoint, options);
  }
}

/**
 * Fallback usando localStorage
 */
function apiFallback(endpoint, options = {}) {
  const method = options.method || 'GET';

  // Settings endpoints
  if (endpoint === '/api/settings') {
    if (method === 'GET') {
      const data = localStorage.getItem('moneynest_settings');
      return data ? JSON.parse(data) : { currency: 'BRL', language: 'pt-PT', theme: 'dark', records: [], monthlyGoals: {} };
    }
    if (method === 'PUT') {
      const current = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
      const updated = { ...current, ...JSON.parse(options.body) };
      localStorage.setItem('moneynest_settings', JSON.stringify(updated));
      return updated;
    }
  }

  // Todos endpoints
  if (endpoint === '/api/todos' || endpoint.startsWith('/api/todos/')) {
    let todos = JSON.parse(localStorage.getItem('moneynest_todos') || '[]');

    if (method === 'GET') {
      return todos;
    }

    if (method === 'POST') {
      const todo = JSON.parse(options.body);
      const newTodo = {
        ...todo,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      todos.push(newTodo);
      localStorage.setItem('moneynest_todos', JSON.stringify(todos));
      return newTodo;
    }

    if (method === 'PUT') {
      const id = parseInt(endpoint.split('/').pop(), 10);
      const payload = JSON.parse(options.body);
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = {
          ...todos[index],
          ...payload,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('moneynest_todos', JSON.stringify(todos));
        return todos[index];
      }
      return payload;
    }

    if (method === 'DELETE') {
      const id = parseInt(endpoint.split('/').pop(), 10);
      todos = todos.filter(t => t.id !== id);
      localStorage.setItem('moneynest_todos', JSON.stringify(todos));
      return { success: true };
    }

    return todos;
  }

  // Records endpoints
  if (endpoint !== '/api/records' && !endpoint.startsWith('/api/records/')) {
    return [];
  }

  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  let records = settings.records || [];

  if (method === 'GET') {
    return records;
  }

  if (method === 'POST') {
    const newRecord = JSON.parse(options.body);
    newRecord.id = Date.now();
    records.push(newRecord);
    settings.records = records;
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
    return newRecord;
  }

  if (method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop());
    const updatedRecord = JSON.parse(options.body);
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updatedRecord };
      settings.records = records;
      localStorage.setItem('moneynest_settings', JSON.stringify(settings));
    }
    return updatedRecord;
  }

  if (method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop());
    settings.records = records.filter(r => r.id !== id);
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
    return { success: true };
  }

  return records;
}

// ================================================
// FUNÇÕES PÚBLICAS DA API
// ================================================

/**
 * Obter todos os registos
 */
async function apiGetRecords() {
  return apiFetch('/api/records');
}

/**
 * Criar um novo registo
 */
async function apiCreateRecord(record) {
  return apiFetch('/api/records', {
    method: 'POST',
    body: JSON.stringify(record)
  });
}

/**
 * Atualizar um registo
 */
async function apiUpdateRecord(id, record) {
  return apiFetch(`/api/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(record)
  });
}

/**
 * Eliminar um registo
 */
async function apiDeleteRecord(id) {
  return apiFetch(`/api/records/${id}`, {
    method: 'DELETE'
  });
}

/**
 * Obter todos os TODOs
 */
async function apiGetTodos() {
  return apiFetch('/api/todos');
}

/**
 * Criar TODO
 */
async function apiCreateTodo(todo) {
  return apiFetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(todo)
  });
}

/**
 * Atualizar TODO
 */
async function apiUpdateTodo(id, todo) {
  return apiFetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo)
  });
}

/**
 * Eliminar TODO
 */
async function apiDeleteTodo(id) {
  return apiFetch(`/api/todos/${id}`, {
    method: 'DELETE'
  });
}

/**
 * Obter definições
 */
async function apiGetSettings() {
  return apiFetch('/api/settings');
}

/**
 * Atualizar definições
 */
async function apiUpdateSettings(settings) {
  return apiFetch('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settings)
  });
}
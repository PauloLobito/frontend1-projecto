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
  const key = endpoint.replace('/api/', '');
  
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
  
  // Records endpoints
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
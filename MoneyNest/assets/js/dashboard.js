// ================================================
// MONEY NEST - DASHBOARD JAVASCRIPT
// ================================================

// Moedas disponíveis
const currencies = {
  'BRL': { symbol: 'R$', name: 'Real' },
  'EUR': { symbol: '€', name: 'Euro' },
  'USD': { symbol: '$', name: 'Dólar' }
};

// ================================================
// FUNÇÃO: applyTheme
// ================================================
function applyTheme(theme) {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  if (theme === 'auto') {
    if (isDaytime) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// ================================================
// FUNÇÃO: loadAndApplyTheme
// ================================================
function loadAndApplyTheme() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const theme = settings.theme || 'dark';
  applyTheme(theme);
  
  if (theme === 'auto') {
    setInterval(() => {
      const currentSettings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
      if (currentSettings.theme === 'auto') {
        applyTheme('auto');
      }
    }, 60000);
  }
}

// ================================================
// FUNÇÃO: formatCurrency
// ================================================
function formatCurrency(value) {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const currency = settings.currency || 'BRL';
  
  return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : currency === 'EUR' ? 'de-DE' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// ================================================
// FUNÇÃO: getDefaultCategories
// ================================================
function getDefaultCategories() {
  return {
    income: ['Salário', 'E-commerce', 'Anúncios', 'Loja', 'Freelance', 'Investimentos'],
    expense: ['Habitação', 'Pessoal', 'Transportes', 'Alimentação', 'Saúde', 'Lazer']
  };
}

// ================================================
// FUNÇÃO: loadIncomeCategories
// ================================================
function loadIncomeCategories() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const categories = settings.categories;
  const defaultCats = getDefaultCategories();
  const barLabels = document.querySelectorAll('.bar-label');
  
  const incomeCategories = categories ? categories.income : defaultCats.income;
  
  barLabels.forEach((label, index) => {
    if (incomeCategories[index]) {
      label.textContent = incomeCategories[index];
    } else {
      label.textContent = '';
    }
  });
}

// ================================================
// FUNÇÃO: loadRevenueGoal
// ================================================
function loadRevenueGoal() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const goal = settings.revenueGoal || 0;
  const revenue = settings.currentRevenue || 0;
  const currency = settings.currency || 'BRL';
  const symbol = currencies[currency].symbol;
  
  document.getElementById('goalAmount').textContent = formatCurrency(goal);
  document.getElementById('currentRevenue').textContent = formatCurrency(revenue);
  document.getElementById('goalInput').placeholder = '0,00';
  document.getElementById('goalInput').min = '0';
  
  const percentEl = document.querySelector('.percent');
  let percent = 0;
  if (goal > 0) {
    percent = Math.min(Math.round((revenue / goal) * 100), 100);
  }
  percentEl.textContent = percent + '%';
  
  const fillEl = document.getElementById('progressFill');
  if (fillEl) {
    fillEl.style.width = percent + '%';
  }
}

// ================================================
// FUNÇÃO: setRevenueGoal
// ================================================
function setRevenueGoal() {
  const input = document.getElementById('goalInput');
  let value = parseFloat(input.value.replace(',', '.'));
  
  if (isNaN(value)) {
    value = 0;
  }
  
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  settings.revenueGoal = value;
  localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  
  input.value = '';
  loadRevenueGoal();
  
  const btn = document.querySelector('.btn-set-goal');
  const originalText = btn.textContent;
  btn.textContent = '✓';
  btn.style.background = 'var(--green)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 1500);
}

// ================================================
// FUNÇÃO: applySettings
// ================================================
function applySettings() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const currency = settings.currency || 'BRL';
  const t = translations[lang].dashboard;
  const symbol = currencies[currency].symbol;

  // Atualizar moeda
  document.querySelectorAll('.currency-symbol').forEach(el => {
    el.textContent = symbol;
  });

  // Atualizar idioma - Mês atual no sidebar
  const mesesSidebar = document.querySelectorAll('.months li');
  mesesSidebar.forEach((li, index) => {
    li.textContent = t.months[index];
  });

  // Destaca o mês atual na sidebar
  const hoje = new Date();
  mesesSidebar.forEach((li, index) => {
    li.classList.remove('active');
    if (index === hoje.getMonth()) {
      li.classList.add('active');
    }
  });

  // Data atual formatada
  const diaSemana = t.dias[hoje.getDay()];
  const dia = hoje.getDate();
  const mes = t.meses[hoje.getMonth()];
  const ano = hoje.getFullYear();
  document.getElementById('currentDate').textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

  // Textos tradados
  document.querySelector('.eyebrow').textContent = t.eyebrow;
  document.querySelector('h1').textContent = t.balanceTitle;
  document.querySelectorAll('.tab')[0].textContent = t.tabs[0];
  document.querySelectorAll('.tab')[1].textContent = t.tabs[1];
  document.querySelector('.metric').textContent = t.heroTitle;
  document.querySelectorAll('h3')[0].textContent = t.expenses;
  document.querySelectorAll('h3')[1].textContent = t.expensesList;
  document.querySelectorAll('.item-name')[0].textContent = t.housing;
  document.querySelectorAll('.item-name')[1].textContent = t.personal;
  document.querySelectorAll('.item-name')[2].textContent = t.transport;
  document.querySelector('.progress-text').textContent = t.progressText;
  document.querySelectorAll('h3')[2].textContent = t.incomeSources;
  document.querySelectorAll('.bar-label')[0].textContent = t.ecommerce;
  document.querySelectorAll('.bar-label')[1].textContent = t.ads;
  document.querySelectorAll('.bar-label')[2].textContent = t.store;
  document.querySelectorAll('.bar-label')[3].textContent = t.salary;
  document.querySelectorAll('h3')[3].textContent = t.revenue;
  document.querySelectorAll('h3')[4].textContent = t.notification;
  document.querySelector('.notification').textContent = t.noNotification;
  document.querySelectorAll('h3')[5].textContent = t.incomeExpense;
  document.querySelectorAll('h3')[6].textContent = t.assets;
  document.querySelectorAll('.asset-list div')[0].innerHTML = `${t.gold}<strong><span class="currency-symbol">${symbol}</span> 0</strong>`;
  document.querySelectorAll('.asset-list div')[1].innerHTML = `${t.warehouse}<strong><span class="currency-symbol">${symbol}</span> 0</strong>`;
  document.querySelectorAll('.asset-list div')[2].innerHTML = `${t.stocks}<strong><span class="currency-symbol">${symbol}</span> 0</strong>`;
  document.querySelectorAll('.asset-list div')[3].innerHTML = `${t.land}<strong><span class="currency-symbol">${symbol}</span> 0</strong>`;
  document.querySelectorAll('h3')[7].textContent = t.petExpenses;
  document.querySelector('.muted-link').textContent = t.petSummary;
  document.querySelectorAll('.expense-name')[0].textContent = t.vet;
  document.querySelectorAll('.expense-category')[0].textContent = t.categoryHealth;
  document.querySelectorAll('.expense-name')[1].textContent = t.food;
  document.querySelectorAll('.expense-category')[1].textContent = t.categoryFood;
  document.querySelectorAll('.expense-name')[2].textContent = t.treats;
  document.querySelectorAll('.expense-category')[2].textContent = t.categoryFood;
  document.querySelectorAll('.expense-name')[3].textContent = t.grooming;
  document.querySelectorAll('.expense-category')[3].textContent = t.categoryCare;

  // Botões de auth
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  if (loginBtn) loginBtn.textContent = t.login;
  if (registerBtn) registerBtn.textContent = t.register;
}

// ================================================
// FUNÇÃO: logout
// ================================================
function logout() {
  localStorage.removeItem('moneynest_loggedIn');
  window.location.reload();
}

// ================================================
// FUNÇÕES: TABS
// ================================================

/**
 * Alterna entre as tabs Dashboard e Relatórios
 * @param {string} tab - Nome da tab (dashboard ou reports)
 */
function switchTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  const dashboardView = document.getElementById('dashboardView');
  const reportsView = document.getElementById('reportsView');
  
  tabs.forEach(t => t.classList.remove('active'));
  
  if (tab === 'dashboard') {
    tabs[0].classList.add('active');
    dashboardView.style.display = 'grid';
    reportsView.style.display = 'none';
  } else {
    tabs[1].classList.add('active');
    dashboardView.style.display = 'none';
    reportsView.style.display = 'block';
    loadRecords();
  }
}

// ================================================
// VARIÁVEL: currentRecordType
// ================================================
let currentRecordType = 'expense';
let currentFilter = 'all';

// ================================================
// FUNÇÕES: MODAL DE REGISTOS
// ================================================

/**
 * Abre o modal para adicionar um novo registo
 */
function openRecordModal() {
  const modal = document.getElementById('recordModal');
  currentRecordType = 'expense';
  
  // Definir data atual
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('recordDate').value = today;
  document.getElementById('recordAmount').value = '';
  document.getElementById('recordDescription').value = '';
  
  setRecordType('expense');
  loadRecordCategories();
  
  modal.classList.add('active');
  document.getElementById('recordAmount').focus();
}

/**
 * Fecha o modal de registos
 */
function closeRecordModal() {
  document.getElementById('recordModal').classList.remove('active');
}

/**
 * Define o tipo de registo e atualiza a UI
 * @param {string} type - Tipo (income ou expense)
 */
function setRecordType(type) {
  currentRecordType = type;
  
  const buttons = document.querySelectorAll('.type-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.type === type) {
      btn.classList.add('active');
    }
  });
  
  loadRecordCategories();
}

/**
 * Carrega as categorias no select do modal
 */
function loadRecordCategories() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const categories = settings.categories || getDefaultCategories();
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  const select = document.getElementById('recordCategory');
  
  select.innerHTML = '';
  const catList = currentRecordType === 'income' ? categories.income : categories.expense;
  
  catList.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
  
  // Atualizar símbolo da moeda no modal
  const modalCurrencyIcon = document.querySelector('#recordModal .input-icon');
  if (modalCurrencyIcon) {
    modalCurrencyIcon.textContent = currencySymbol;
  }
}

/**
 * Adiciona um novo registo
 */
function addRecord() {
  const amount = parseFloat(document.getElementById('recordAmount').value) || 0;
  const description = document.getElementById('recordDescription').value.trim();
  const category = document.getElementById('recordCategory').value;
  const date = document.getElementById('recordDate').value;
  
  if (amount <= 0) {
    document.getElementById('recordAmount').style.borderColor = 'var(--red)';
    setTimeout(() => {
      document.getElementById('recordAmount').style.borderColor = '';
    }, 2000);
    return;
  }
  
  const record = {
    id: Date.now(),
    type: currentRecordType,
    amount: amount,
    description: description || category,
    category: category,
    date: date
  };
  
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  if (!settings.records) {
    settings.records = [];
  }
  settings.records.push(record);
  localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  
  closeRecordModal();
  loadRecords();
}

/**
 * Filtra os registos por tipo
 * @param {string} filter - Filtro (all, income, expense)
 */
function filterRecords(filter) {
  currentFilter = filter;
  
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });
  
  loadRecords();
}

/**
 * Carrega e exibe os registos
 */
function loadRecords() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  const list = document.getElementById('recordsList');
  
  // Filtrar registos
  let filteredRecords = records;
  if (currentFilter !== 'all') {
    filteredRecords = records.filter(r => r.type === currentFilter);
  }
  
  // Ordenar por data (mais recente primeiro)
  filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Calcular totais
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const balance = totalIncome - totalExpense;
  
  document.getElementById('totalIncome').textContent = formatCurrencyValue(totalIncome);
  document.getElementById('totalExpense').textContent = formatCurrencyValue(totalExpense);
  document.getElementById('totalBalance').textContent = formatCurrencyValue(balance);
  
  // Renderizar lista
  if (filteredRecords.length === 0) {
    list.innerHTML = `
      <div class="no-records">
        <p>Ainda não há registos.</p>
        <p>Clique em "Adicionar" para criar o seu primeiro registo.</p>
      </div>
    `;
    return;
  }
  
  list.innerHTML = filteredRecords.map(record => `
    <div class="record-item ${record.type}">
      <div class="record-info">
        <span class="record-description">${record.description}</span>
        <div class="record-meta">
          <span class="record-category">${record.category}</span>
          <span>${formatDate(record.date)}</span>
        </div>
      </div>
      <div class="record-actions">
        <span class="record-value">${record.type === 'income' ? '+' : '-'}${currencySymbol} ${formatCurrencyValue(record.amount)}</span>
        <button class="record-delete" onclick="deleteRecord(${record.id})" title="Eliminar">🗑️</button>
      </div>
    </div>
  `).join('');
}

/**
 * Formata um valor numérico para moeda
 * @param {number} value - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatCurrencyValue(value) {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const currency = settings.currency || 'BRL';
  
  const locales = {
    'BRL': 'pt-BR',
    'EUR': 'de-DE',
    'USD': 'en-US'
  };
  
  return new Intl.NumberFormat(locales[currency] || 'pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Formata uma data para o formato local
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-PT');
}

/**
 * Elimina um registo pelo ID
 * @param {number} id - ID do registo
 */
function deleteRecord(id) {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  if (settings.records) {
    settings.records = settings.records.filter(r => r.id !== id);
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
    loadRecords();
  }
}

// ================================================
// EVENTO: DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar tema
  loadAndApplyTheme();

  // Verifica se o utilizador está logado
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang].dashboard;

  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    const authSection = document.getElementById('authSection');
    
    authSection.innerHTML = `
      <div class="user-profile">
        <div class="user-info">
          <span class="user-name">${user.firstName} ${user.lastName}</span>
        </div>
        <div class="user-avatar">${user.firstName.charAt(0).toUpperCase()}</div>
        <button class="btn-logout" onclick="logout()">${t.logout}</button>
      </div>
    `;
  }

  // Aplicar definições
  applySettings();
  
  // Carregar meta de receita
  loadRevenueGoal();
  
  // Carregar categorias de receita
  loadIncomeCategories();
  
  // Listeners do modal
  document.getElementById('recordModal').addEventListener('click', function(e) {
    if (e.target === this) closeRecordModal();
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeRecordModal();
  });
  
  document.getElementById('recordAmount').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addRecord();
  });
});

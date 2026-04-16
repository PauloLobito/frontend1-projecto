// ================================================
// MONEY NEST - DASHBOARD JAVASCRIPT
// ================================================

// Traduções
const translations = {
  'pt-PT': {
    dias: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    eyebrow: 'Painel Financeiro Pessoal',
    balanceTitle: 'Saldo Disponível',
    tabs: ['Dashboard', 'Relatórios'],
    heroTitle: 'Património Total',
    expenses: 'Gastos',
    expensesList: 'Despesas',
    housing: 'Habitação',
    personal: 'Pessoal',
    transport: 'Transportes',
    goalTitle: 'Meta de Receita',
    progressText: 'Progresso do mês',
    incomeSources: 'Fontes de Receita',
    ecommerce: 'E-commerce',
    ads: 'Anúncios',
    store: 'Loja',
    salary: 'Salário',
    revenue: 'Receita',
    notification: 'Notificação',
    noNotification: 'Sem notificações no momento.',
    incomeExpense: 'Receitas e Despesas',
    assets: 'Ativos',
    gold: 'Ouro',
    warehouse: 'Armazém',
    stocks: 'Ações',
    land: 'Terreno',
    petExpenses: 'Despesas com Animais',
    petSummary: 'resumo mensal',
    vet: 'Consulta Veterinária',
    food: 'Ração',
    treats: 'Petiscos',
    grooming: 'Banho e Hospedagem',
    categoryHealth: 'Saúde',
    categoryFood: 'Alimentação',
    categoryCare: 'Cuidados',
    login: 'Iniciar Sessão',
    register: 'Registar',
    logout: 'Sair',
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  },
  'pt-BR': {
    dias: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    eyebrow: 'Painel Financeiro Pessoal',
    balanceTitle: 'Saldo Disponível',
    tabs: ['Dashboard', 'Relatórios'],
    heroTitle: 'Patrimônio Total',
    expenses: 'Gastos',
    expensesList: 'Despesas',
    housing: 'Moradia',
    personal: 'Pessoal',
    transport: 'Transportes',
    goalTitle: 'Meta de Receita',
    progressText: 'Progresso do mês',
    incomeSources: 'Fontes de Receita',
    ecommerce: 'E-commerce',
    ads: 'Anúncios',
    store: 'Loja',
    salary: 'Salário',
    revenue: 'Receita',
    notification: 'Notificação',
    noNotification: 'Sem notificações no momento.',
    incomeExpense: 'Receitas e Despesas',
    assets: 'Ativos',
    gold: 'Ouro',
    warehouse: 'Armazém',
    stocks: 'Ações',
    land: 'Terreno',
    petExpenses: 'Despesas com Animais',
    petSummary: 'resumo mensal',
    vet: 'Consulta Veterinária',
    food: 'Ração',
    treats: 'Petiscos',
    grooming: 'Banho e Hospedagem',
    categoryHealth: 'Saúde',
    categoryFood: 'Alimentação',
    categoryCare: 'Cuidados',
    login: 'Entrar',
    register: 'Cadastrar',
    logout: 'Sair',
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  },
  'en': {
    dias: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    eyebrow: 'Personal Finance Dashboard',
    balanceTitle: 'Available Balance',
    tabs: ['Dashboard', 'Reports'],
    heroTitle: 'Total Assets',
    expenses: 'Expenses',
    expensesList: 'Expenses',
    housing: 'Housing',
    personal: 'Personal',
    transport: 'Transport',
    goalTitle: 'Revenue Goal',
    progressText: 'Month progress',
    incomeSources: 'Income Sources',
    ecommerce: 'E-commerce',
    ads: 'Ads',
    store: 'Store',
    salary: 'Salary',
    revenue: 'Revenue',
    notification: 'Notification',
    noNotification: 'No notifications at the moment.',
    incomeExpense: 'Income and Expenses',
    assets: 'Assets',
    gold: 'Gold',
    warehouse: 'Warehouse',
    stocks: 'Stocks',
    land: 'Land',
    petExpenses: 'Pet Expenses',
    petSummary: 'monthly summary',
    vet: 'Vet Consultation',
    food: 'Pet Food',
    treats: 'Treats',
    grooming: 'Grooming & Boarding',
    categoryHealth: 'Health',
    categoryFood: 'Food',
    categoryCare: 'Care',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  'es': {
    dias: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    eyebrow: 'Panel Financiero Personal',
    balanceTitle: 'Saldo Disponible',
    tabs: ['Dashboard', 'Informes'],
    heroTitle: 'Patrimonio Total',
    expenses: 'Gastos',
    expensesList: 'Gastos',
    housing: 'Vivienda',
    personal: 'Personal',
    transport: 'Transporte',
    goalTitle: 'Meta de Ingresos',
    progressText: 'Progreso del mes',
    incomeSources: 'Fuentes de Ingresos',
    ecommerce: 'E-commerce',
    ads: 'Anuncios',
    store: 'Tienda',
    salary: 'Salario',
    revenue: 'Ingresos',
    notification: 'Notificación',
    noNotification: 'Sin notificaciones por el momento.',
    incomeExpense: 'Ingresos y Gastos',
    assets: 'Activos',
    gold: 'Oro',
    warehouse: 'Almacén',
    stocks: 'Acciones',
    land: 'Terreno',
    petExpenses: 'Gastos con Mascotas',
    petSummary: 'resumen mensual',
    vet: 'Consulta Veterinaria',
    food: 'Comida',
    treats: 'Snacks',
    grooming: 'Baño y Hospedaje',
    categoryHealth: 'Salud',
    categoryFood: 'Alimentación',
    categoryCare: 'Cuidado',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  }
};

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
  const value = parseFloat(input.value.replace(',', '.')) || 0;
  
  if (value <= 0) {
    input.style.borderColor = 'var(--red)';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 2000);
    return;
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
  const t = translations[lang];
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
// EVENTO: DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar tema
  loadAndApplyTheme();

  // Verifica se o utilizador está logado
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];

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
});

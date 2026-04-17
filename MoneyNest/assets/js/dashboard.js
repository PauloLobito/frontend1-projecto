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
  const records = settings.records || [];
  const goal = settings.revenueGoal || 0;
  const currency = settings.currency || 'BRL';
  const symbol = currencies[currency].symbol;
  
  // Calcular saldo disponível (total de todos os registos)
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const balance = totalIncome - totalExpense;
  
  document.getElementById('goalAmount').textContent = formatCurrency(goal);
  document.getElementById('currentRevenue').textContent = formatCurrency(balance);
  document.getElementById('goalInput').placeholder = '0,00';
  document.getElementById('goalInput').min = '0';
  
  const percentEl = document.querySelector('.percent');
  let percent = 0;
  if (goal > 0) {
    percent = Math.min(Math.round((balance / goal) * 100), 100);
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

  // Atualizar idioma - Mês atual no sidebar (usa top-level months)
  const mesesSidebar = document.querySelectorAll('.months li');
  mesesSidebar.forEach((li, index) => {
    li.textContent = translations[lang].months[index];
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
  
  // Atualizar dashboard com dados dos registos
  updateDashboardWithRecords();
}

// ================================================
// FUNÇÃO: updateDashboardWithRecords
// ================================================
/**
 * Atualiza o dashboard com os dados dos registos
 */
function updateDashboardWithRecords() {
  console.log('updateDashboardWithRecords called');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const categories = settings.categories || getDefaultCategories();
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  console.log('records:', records.length);
  
  // Obter mês e ano atuais
  const hoje = new Date();
  const currentMonth = hoje.getMonth();
  const currentYear = hoje.getFullYear();
  
  // Filtrar registos do mês atual
  const monthlyRecords = records.filter(r => {
    const recordDate = new Date(r.date);
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
  });
  
  // Calcular totais mensais
  const totalIncome = monthlyRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = monthlyRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  
  // Calcular totais de todos os registos
  const totalAllIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalAllExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const balance = totalAllIncome - totalAllExpense;
  
  // Atualizar valores no dashboard
  // Saldo disponível (total de todos os registos)
  const balanceEl = document.querySelector('.balance');
  if (balanceEl) {
    balanceEl.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(balance)}`;
  }
  
  // Gastos (despesas mensais)
  const gastosEl = document.querySelector('.mini-value');
  if (gastosEl) {
    gastosEl.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalExpense)}`;
  }
  
  // Receita total (mensal)
  const revenueEl = document.querySelectorAll('.mini-value')[1];
  if (revenueEl) {
    revenueEl.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalIncome)}`;
  }
  
  // Património Total (todos os registos)
  const totalPatrimony = totalAllIncome - totalAllExpense;
  const patrimonyEl = document.querySelector('.hero .value');
  if (patrimonyEl) {
    patrimonyEl.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalPatrimony)}`;
  }
   
  // Meta de receita
  const goalAmount = settings.revenueGoal || 0;
  const progressPercent = goalAmount > 0 ? Math.min(Math.round((totalIncome / goalAmount) * 100), 100) : 0;
  
  const currentRevenueEl = document.getElementById('currentRevenue');
  const goalAmountEl = document.getElementById('goalAmount');
  const percentEl = document.querySelector('.percent');
  const progressFill = document.getElementById('progressFill');
  
  if (currentRevenueEl) currentRevenueEl.textContent = formatCurrencyValue(totalIncome);
  if (goalAmountEl) goalAmountEl.textContent = formatCurrencyValue(goalAmount);
  if (percentEl) percentEl.textContent = progressPercent + '%';
  if (progressFill) progressFill.style.width = progressPercent + '%';
  
  // Fontes de receita (barras)
  const incomeByCategory = {};
  monthlyRecords.filter(r => r.type === 'income').forEach(r => {
    incomeByCategory[r.category] = (incomeByCategory[r.category] || 0) + r.amount;
  });
  
  const barCols = document.querySelectorAll('.bar-col');
  const maxIncome = Math.max(...Object.values(incomeByCategory), 1);
  
  barCols.forEach((col, index) => {
    const category = categories.income[index];
    const amount = incomeByCategory[category] || 0;
    
    const barValue = col.querySelector('.bar-value');
    const barLabel = col.querySelector('.bar-label');
    const bar = col.querySelector('.bar');
    
    // Só mostra se tiver valor
    if (amount > 0) {
      col.style.display = '';
      
      if (barValue) {
        barValue.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(amount)}`;
      }
      
      if (barLabel) {
        barLabel.textContent = category || '';
      }
      
      if (bar) {
        const barHeight = Math.max((amount / maxIncome) * 80, 4);
        bar.style.height = barHeight + 'px';
      }
    } else {
      col.style.display = 'none';
    }
  });
  
  // Lista de despesas
  const expenseByCategory = {};
  monthlyRecords.filter(r => r.type === 'expense').forEach(r => {
    expenseByCategory[r.category] = (expenseByCategory[r.category] || 0) + r.amount;
  });
  
  const expenseList = document.querySelector('.list');
  if (expenseList) {
    expenseList.innerHTML = '';
    
    const icons = ['⌂', '👥', '🚗', '🍽️', '💊', '🎮', '✏️', '📱', '🐕', '🏥', '🛒', '📚'];
    const colors = ['icon-purple', 'icon-pink', 'icon-orange', 'icon-green', 'icon-blue'];
    
    Object.entries(expenseByCategory).forEach(([category, amount], index) => {
      if (amount > 0) {
        const icon = icons[index % icons.length];
        const color = colors[index % colors.length];
        
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
          <div class="icon-box ${color}">${icon}</div>
          <div class="item-meta">
            <div class="item-name">${category}</div>
            <div class="item-amount"><span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(amount)}</div>
          </div>
        `;
        expenseList.appendChild(item);
      }
    });
  }
  
  // Atualizar "Receitas e Despesas" (totais do gráfico)
  const chartHeader = document.querySelector('.chart-header');
  if (chartHeader) {
    const valueDivs = chartHeader.querySelectorAll('div > div');
    if (valueDivs[0]) valueDivs[0].innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalExpense)}`;
    if (valueDivs[1]) valueDivs[1].innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalIncome)}`;
  }
  
  // Renderizar gráfico de barras "Receitas e Despesas"
  renderChart();
  
  updatePetsExpenses();
}

// ================================================
// FUNÇÃO: updatePetsExpenses
// ================================================
function updatePetsExpenses() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  
  const hoje = new Date();
  const currentMonth = hoje.getMonth();
  const currentYear = hoje.getFullYear();
  
  const monthlyRecords = records.filter(r => {
    const recordDate = new Date(r.date);
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
  });
  
  const petsDescriptions = ['Consulta Veterinária', 'Ração', 'Petiscos', 'Banho e Hospedagem'];
  
  const petsValues = {
    'Consulta Veterinária': 0,
    'Ração': 0,
    'Petiscos': 0,
    'Banho e Hospedagem': 0
  };
  
  monthlyRecords.filter(r => r.type === 'expense' && petsDescriptions.includes(r.description))
    .forEach(r => {
      petsValues[r.description] = (petsValues[r.description] || 0) + r.amount;
    });
  
  const elements = {
    'petsVetValue': petsValues['Consulta Veterinária'],
    'petsFoodValue': petsValues['Ração'],
    'petsTreatsValue': petsValues['Petiscos'],
    'petsGroomValue': petsValues['Banho e Hospedagem']
  };
  
  Object.entries(elements).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(value)}`;
    }
  });
}

// ================================================
// FUNÇÃO: logout
// ================================================
function logout() {
  localStorage.removeItem('moneynest_loggedIn');
  window.location.reload();
}

// ================================================
// FUNÇÃO: renderChart
// ================================================
function renderChart() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => ({ month: i, year: currentYear }));
  
  const monthlyData = months.map(m => {
    const monthRecords = records.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() === m.month && d.getFullYear() === m.year;
    });
    const income = monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
    const expense = monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
    return { income, expense };
  });
  
  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)), 1);
  const chartHeight = 200;
  const chartLeft = 40;
  const chartRight = 760;
  const chartTop = 20;
  const chartBottom = 220;
  const barGroupWidth = (chartRight - chartLeft) / 12;
  const barWidth = barGroupWidth * 0.35;
  
  let barsHTML = `
    <g opacity="0.18" stroke="#b9c4ff">
      <path d="M40 20 H760"/><path d="M40 60 H760"/><path d="M40 100 H760"/><path d="M40 140 H760"/><path d="M40 180 H760"/><path d="M40 220 H760"/>
    </g>
  `;
  
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  months.forEach((m, i) => {
    const data = monthlyData[i];
    const groupX = chartLeft + (i + 0.5) * barGroupWidth;
    const incomeHeight = (data.income / maxValue) * (chartBottom - chartTop);
    const expenseHeight = (data.expense / maxValue) * (chartBottom - chartTop);
    
    const incomeY = chartBottom - incomeHeight;
    const expenseY = chartBottom - expenseHeight;
    
    const incomeX = groupX - barWidth - 2;
    const expenseX = groupX + 2;
    
    barsHTML += `
      <rect x="${incomeX}" y="${incomeY}" width="${barWidth}" height="${incomeHeight}" fill="#00c853" rx="4"/>
      <rect x="${expenseX}" y="${expenseY}" width="${barWidth}" height="${expenseHeight}" fill="#ff5722" rx="4"/>
    `;
    
    const labelY = chartBottom + 18;
    barsHTML += `
      <text x="${groupX}" y="${labelY}" text-anchor="middle" fill="#888" font-size="14" font-weight="600">${monthNames[i]}</text>
    `;
  });
  
  const svg = document.querySelector('.chart-wrap svg');
  if (svg) {
    svg.innerHTML = barsHTML;
    svg.setAttribute('viewBox', `0 0 ${chartRight} 260`);
  } else {
    console.log('SVG not found');
  }
  
  const totalIncome = monthlyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = monthlyData.reduce((sum, d) => sum + d.expense, 0);
  const totalBalance = totalIncome - totalExpense;
  
  const assetsIncome = document.getElementById('assetsIncome');
  const assetsExpense = document.getElementById('assetsExpense');
  const assetsBalance = document.getElementById('assetsBalance');
  const assetsPatrimony = document.getElementById('assetsPatrimony');
  
  if (assetsIncome) {
    assetsIncome.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalIncome)}`;
    console.log('assetsIncome updated');
  } else {
    console.log('assetsIncome NOT FOUND');
  }
  if (assetsExpense) assetsExpense.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalExpense)}`;
  if (assetsBalance) assetsBalance.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalBalance)}`;
  if (assetsPatrimony) assetsPatrimony.innerHTML = `<span class="currency-symbol">${currencySymbol}</span> ${formatCurrencyValue(totalBalance)}`;
  
  console.log('All assets updated');
  
  console.log('Chart rendered, records:', records.length, 'barsHTML length:', barsHTML.length);
  
  updateDonut(totalIncome, totalExpense);
}

function updateDonut(income, expense) {
  const donut = document.querySelector('.donut');
  if (!donut) return;
  
  const total = income + expense;
  if (total === 0) {
    donut.style.background = `
      radial-gradient(circle at center, #141f4f 0 42%, transparent 43%),
      conic-gradient(#555 0 100%)
    `;
    return;
  }
  
  const incomePercent = (income / total) * 100;
  const expensePercent = (expense / total) * 100;
  
  donut.style.background = `
    radial-gradient(circle at center, #141f4f 0 42%, transparent 43%),
    conic-gradient(#00c853 0 ${incomePercent}%, #ff5722 ${incomePercent}% 100%)
  `;
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
  
  // Reset custom select
  const customSelect = document.getElementById('recordDescriptionCustomSelect');
  if (customSelect) {
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const valueSpan = trigger.querySelector('.custom-select-value');
    if (valueSpan) valueSpan.textContent = 'Selecione...';
    customSelect.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));
  }
  
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
  const dropdown = document.getElementById('recordCategoryDropdown');
  const customSelect = document.getElementById('recordCategoryCustomSelect');
  
  const catList = currentRecordType === 'income' ? categories.income : categories.expense;
  
  if (dropdown) {
    dropdown.innerHTML = '';
    
    catList.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'custom-select-option';
      div.dataset.value = cat;
      div.textContent = cat;
      div.onclick = function() {
        selectCategoryCustomOption('record', cat, cat);
        onCategoryChange('record');
      };
      dropdown.appendChild(div);
    });
    
    // Set first category as default if none selected
    if (catList.length > 0) {
      const trigger = customSelect.querySelector('.custom-select-trigger');
      const valueSpan = trigger.querySelector('.custom-select-value');
      if (valueSpan && !valueSpan.textContent || valueSpan.textContent === 'Selecione...') {
        valueSpan.textContent = catList[0];
        const firstOpt = dropdown.querySelector('.custom-select-option');
        if (firstOpt) firstOpt.classList.add('selected');
      }
    }
  }
  
  // Atualizar símbolo da moeda no modal
  const modalCurrencyIcon = document.querySelector('#recordModal .input-icon');
  if (modalCurrencyIcon) {
    modalCurrencyIcon.textContent = currencySymbol;
  }
  
  // Verificar se a categoria atual é PETS
  onCategoryChange('record');
}

/**
 * Verifica se a categoria é PETS e mostra o dropdown apropriado
 * @param {string} modal - 'record' ou 'edit'
 */
function onCategoryChange(modal) {
  let category, textGroup, selectGroup, textInput, selectInput;
  
  if (modal === 'record') {
    category = getCategoryCustomSelectValue('record');
    textGroup = document.getElementById('recordDescriptionTextGroup');
    selectGroup = document.getElementById('recordDescriptionSelectGroup');
    textInput = document.getElementById('recordDescription');
    selectInput = document.getElementById('recordDescriptionSelect');
  } else {
    category = getCategoryCustomSelectValue('edit');
    textGroup = document.getElementById('editDescriptionTextGroup');
    selectGroup = document.getElementById('editDescriptionSelectGroup');
    textInput = document.getElementById('editRecordDescription');
    selectInput = document.getElementById('editRecordDescriptionSelect');
  }
  
  if (!category) return;
  
  const categoryLower = category.toLowerCase();
  console.log('onCategoryChange:', modal, 'category:', category, 'lower:', categoryLower);
  
  // Verificar se a categoria é PETS
  const isPets = categoryLower === 'pets' || categoryLower === 'pet';
  console.log('isPets:', isPets, 'textGroup:', textGroup, 'selectGroup:', selectGroup);
  
  if (isPets) {
    textGroup.style.display = 'none';
    selectGroup.style.display = '';
    textInput.value = '';
    if (selectInput) selectInput.value = '';
  } else {
    textGroup.style.display = '';
    selectGroup.style.display = 'none';
    textInput.value = '';
    if (selectInput) selectInput.value = '';
  }
}

/**
 * Adiciona um novo registo
 */
function addRecord() {
  const amount = parseFloat(document.getElementById('recordAmount').value) || 0;
  const category = getCategoryCustomSelectValue('record');
  const date = document.getElementById('recordDate').value;
  
  // Verificar se é PETS para usar o custom select ou input
  const categoryLower = category.toLowerCase();
  const isPets = categoryLower === 'pets' || categoryLower === 'pet';
  let description;
  
  if (isPets) {
    const customSelect = document.getElementById('recordDescriptionCustomSelect');
    if (customSelect) {
      const selectedOpt = customSelect.querySelector('.custom-select-option.selected');
      description = selectedOpt ? selectedOpt.dataset.value : '';
    } else {
      description = '';
    }
  } else {
    description = document.getElementById('recordDescription').value.trim();
  }
  
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
  updateDashboardWithRecords();
}

// ================================================
// VARIÁVEL: editingRecordId
// ================================================
let editingRecordId = null;

// ================================================
// FUNÇÕES: EDITAR REGISTOS
// ================================================

/**
 * Abre o modal para editar um registo
 * @param {number} id - ID do registo a editar
 */
function openEditModal(id) {
  const modal = document.getElementById('editModal');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const record = settings.records.find(r => r.id === id);
  
  if (!record) return;
  
  editingRecordId = id;
  
  document.getElementById('editRecordAmount').value = record.amount;
  document.getElementById('editRecordDate').value = record.date;
  
  setEditRecordType(record.type);
  loadEditRecordCategories(record.type, record.category);
  
  // Definir descrição no campo correto
  const categoryLower = record.category.toLowerCase();
  const isPets = categoryLower === 'pets' || categoryLower === 'pet';
  
  if (isPets) {
    document.getElementById('editDescriptionTextGroup').style.display = 'none';
    document.getElementById('editDescriptionSelectGroup').style.display = '';
    
    // Set custom select value
    const customSelect = document.getElementById('editDescriptionCustomSelect');
    if (customSelect) {
      const trigger = customSelect.querySelector('.custom-select-trigger');
      const valueSpan = trigger.querySelector('.custom-select-value');
      customSelect.querySelectorAll('.custom-select-option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.value === record.description) {
          opt.classList.add('selected');
          if (valueSpan) valueSpan.textContent = opt.textContent;
        }
      });
    }
  } else {
    document.getElementById('editDescriptionTextGroup').style.display = '';
    document.getElementById('editDescriptionSelectGroup').style.display = 'none';
    document.getElementById('editRecordDescription').value = record.description;
  }
  
  modal.classList.add('active');
}

/**
 * Fecha o modal de edição
 */
function closeEditModal() {
  document.getElementById('editModal').classList.remove('active');
  editingRecordId = null;
}

/**
 * Define o tipo de registo no modal de edição
 * @param {string} type - Tipo (income ou expense)
 */
function setEditRecordType(type) {
  const buttons = document.querySelectorAll('#editModal .type-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.type === type) {
      btn.classList.add('active');
    }
  });
  
  loadEditRecordCategories(type);
}

/**
 * Carrega as categorias no select do modal de edição
 * @param {string} type - Tipo de registo
 * @param {string} selectedCategory - Categoria selecionada
 */
function loadEditRecordCategories(type, selectedCategory) {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const categories = settings.categories || getDefaultCategories();
  const currency = settings.currency || 'BRL';
  const currencySymbol = currencies[currency]?.symbol || 'R$';
  const dropdown = document.getElementById('editRecordCategoryDropdown');
  const customSelect = document.getElementById('editRecordCategoryCustomSelect');
  
  const catList = type === 'income' ? categories.income : categories.expense;
  
  if (dropdown) {
    dropdown.innerHTML = '';
    
    catList.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'custom-select-option';
      div.dataset.value = cat;
      div.textContent = cat;
      if (cat === selectedCategory) {
        div.classList.add('selected');
      }
      div.onclick = function() {
        selectCategoryCustomOption('edit', cat, cat);
        onCategoryChange('edit');
      };
      dropdown.appendChild(div);
    });
    
    // Set selected category display
    if (selectedCategory) {
      const trigger = customSelect.querySelector('.custom-select-trigger');
      const valueSpan = trigger.querySelector('.custom-select-value');
      if (valueSpan) valueSpan.textContent = selectedCategory;
    }
  }
  
  // Atualizar símbolo da moeda no modal
  const modalCurrencyIcon = document.querySelector('#editModal .input-icon');
  if (modalCurrencyIcon) {
    modalCurrencyIcon.textContent = currencySymbol;
  }
}

/**
 * Guarda as alterações de um registo
 */
function saveEditRecord() {
  const amount = parseFloat(document.getElementById('editRecordAmount').value) || 0;
  const category = getCategoryCustomSelectValue('edit');
  const date = document.getElementById('editRecordDate').value;
  const typeBtn = document.querySelector('#editModal .type-btn.active');
  const type = typeBtn ? typeBtn.dataset.type : 'expense';
  
  // Verificar se é PETS para usar o custom select ou input
  const categoryLower = category.toLowerCase();
  const isPets = categoryLower === 'pets' || categoryLower === 'pet';
  let description;
  
  if (isPets) {
    const customSelect = document.getElementById('editDescriptionCustomSelect');
    if (customSelect) {
      const selectedOpt = customSelect.querySelector('.custom-select-option.selected');
      description = selectedOpt ? selectedOpt.dataset.value : '';
    } else {
      description = '';
    }
  } else {
    description = document.getElementById('editRecordDescription').value.trim();
  }
  
  if (amount <= 0) {
    document.getElementById('editRecordAmount').style.borderColor = 'var(--red)';
    setTimeout(() => {
      document.getElementById('editRecordAmount').style.borderColor = '';
    }, 2000);
    return;
  }
  
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const recordIndex = settings.records.findIndex(r => r.id === editingRecordId);
  
  if (recordIndex !== -1) {
    settings.records[recordIndex] = {
      id: editingRecordId,
      type: type,
      amount: amount,
      description: description || category,
      category: category,
      date: date
    };
    
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  }
  
  closeEditModal();
  loadRecords();
  updateDashboardWithRecords();
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
        <button class="record-edit" onclick="openEditModal(${record.id})" title="Editar">✏️</button>
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
    updateDashboardWithRecords();
  }
}

// ================================================
// FUNÇÕES: CUSTOM SELECT
// ================================================
function toggleCustomSelect(id) {
  const select = document.getElementById(id);
  if (!select) return;
  
  document.querySelectorAll('.custom-select.open').forEach(el => {
    if (el.id !== id) el.classList.remove('open');
  });
  
  select.classList.toggle('open');
}

function selectCustomOption(selectId, value, text) {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  const trigger = select.querySelector('.custom-select-trigger');
  const valueSpan = trigger.querySelector('.custom-select-value');
  
  if (valueSpan) valueSpan.textContent = text;
  
  select.querySelectorAll('.custom-select-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  const selectedOpt = select.querySelector(`[data-value="${value}"]`);
  if (selectedOpt) selectedOpt.classList.add('selected');
  
  select.classList.remove('open');
  
  if (selectId === 'recordDescriptionCustomSelect') {
    const textInput = document.getElementById('recordDescription');
    if (textInput) textInput.value = value;
  } else if (selectId === 'editDescriptionCustomSelect') {
    const textInput = document.getElementById('editRecordDescription');
    if (textInput) textInput.value = value;
  }
}

function selectCategoryCustomOption(modal, value, text) {
  let selectId, textInputId;
  
  if (modal === 'record') {
    selectId = 'recordCategoryCustomSelect';
    textInputId = 'recordCategory';
  } else {
    selectId = 'editRecordCategoryCustomSelect';
    textInputId = 'editRecordCategory';
  }
  
  const select = document.getElementById(selectId);
  if (!select) return;
  
  const trigger = select.querySelector('.custom-select-trigger');
  const valueSpan = trigger.querySelector('.custom-select-value');
  
  if (valueSpan) valueSpan.textContent = text;
  
  select.querySelectorAll('.custom-select-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  const selectedOpt = select.querySelector(`[data-value="${value}"]`);
  if (selectedOpt) selectedOpt.classList.add('selected');
  
  select.classList.remove('open');
  
  // Update hidden text input for compatibility
  const textInput = document.getElementById(textInputId);
  if (textInput) {
    textInput.value = value;
  }
}

function getCategoryCustomSelectValue(modal) {
  if (modal === 'record') {
    const select = document.getElementById('recordCategoryCustomSelect');
    if (select) {
      const selected = select.querySelector('.custom-select-option.selected');
      return selected ? selected.dataset.value : '';
    }
  } else {
    const select = document.getElementById('editRecordCategoryCustomSelect');
    if (select) {
      const selected = select.querySelector('.custom-select-option.selected');
      return selected ? selected.dataset.value : '';
    }
  }
  return '';
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll('.custom-select.open').forEach(el => {
      el.classList.remove('open');
    });
  }
});

// ================================================
// EVENTO: DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
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
        <a href="settings.html" class="user-avatar">${user.firstName.charAt(0).toUpperCase()}</a>
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
  
  document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) closeEditModal();
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeRecordModal();
      closeEditModal();
    }
  });
  
  document.getElementById('recordAmount').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addRecord();
  });
  
  document.getElementById('editRecordAmount').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') saveEditRecord();
  });
});

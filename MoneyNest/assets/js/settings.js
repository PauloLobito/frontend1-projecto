// ================================================
// MONEY NEST - SETTINGS JAVASCRIPT
// ================================================

// ================================================
// VARIÁVEIS
// ================================================
let isEditingProfile = false;
let currentCategoryType = 'income';

// ================================================
// FUNÇÕES: Categorias
// ================================================
function getDefaultCategories() {
  return {
    income: ['Salário', 'E-commerce', 'Anúncios', 'Loja', 'Freelance', 'Investimentos'],
    expense: ['Habitação', 'Pessoal', 'Transportes', 'Alimentação', 'Saúde', 'Lazer']
  };
}

function loadCategories() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  let categories = settings.categories;
  if (!categories) {
    categories = getDefaultCategories();
    settings.categories = categories;
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  }
  
  const incomeList = document.getElementById('incomeCategoryList');
  const expenseList = document.getElementById('expenseCategoryList');
  
  incomeList.innerHTML = '';
  expenseList.innerHTML = '';
  
  categories.income.forEach((cat, index) => {
    const tag = createCategoryTag(cat, 'income', index);
    incomeList.appendChild(tag);
  });
  
  categories.expense.forEach((cat, index) => {
    const tag = createCategoryTag(cat, 'expense', index);
    expenseList.appendChild(tag);
  });
  
  if (document.getElementById('incomeCategoriesTitle')) {
    document.getElementById('incomeCategoriesTitle').textContent = t.incomeCategories;
  }
  if (document.getElementById('expenseCategoriesTitle')) {
    document.getElementById('expenseCategoriesTitle').textContent = t.expenseCategories;
  }
}

function createCategoryTag(name, type, index) {
  const tag = document.createElement('div');
  tag.className = 'category-tag';
  tag.innerHTML = `
    <span>${name}</span>
    <button class="delete-category" onclick="deleteCategory('${type}', ${index})" title="Eliminar">×</button>
  `;
  return tag;
}

function openAddCategoryModal(type) {
  const modal = document.getElementById('categoryModal');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  currentCategoryType = type;
  document.getElementById('newCategoryName').value = '';
  
  if (type === 'income') {
    document.getElementById('categoryModalTitle').textContent = t.addIncomeCategory;
    document.getElementById('categoryTypeInfo').textContent = t.incomeTypeInfo;
  } else {
    document.getElementById('categoryModalTitle').textContent = t.addExpenseCategory;
    document.getElementById('categoryTypeInfo').textContent = t.expenseTypeInfo;
  }
  
  document.getElementById('categoryNameLabel').textContent = t.categoryName;
  document.getElementById('newCategoryName').placeholder = t.categoryPlaceholder;
  
  const cancelBtn = modal.querySelector('.btn-cancel');
  const confirmBtn = modal.querySelector('.btn-confirm');
  cancelBtn.textContent = t.cancel || 'Cancelar';
  confirmBtn.textContent = t.addCategory || 'Adicionar';
  
  modal.classList.add('active');
  document.getElementById('newCategoryName').focus();
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
}

function addCategory() {
  const input = document.getElementById('newCategoryName');
  const name = input.value.trim();
  let settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  if (!name) {
    input.style.borderColor = 'var(--red)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    return;
  }
  
  let categories = settings.categories;
  if (!categories) {
    categories = getDefaultCategories();
    settings.categories = categories;
  }
  
  if (categories[currentCategoryType].some(c => c.toLowerCase() === name.toLowerCase())) {
    input.style.borderColor = 'var(--red)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    return;
  }
  
  categories[currentCategoryType].push(name);
  settings.categories = categories;
  localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  
  closeCategoryModal();
  loadCategories();
}

function deleteCategory(type, index) {
  let settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  let categories = settings.categories;
  
  if (!categories) {
    categories = getDefaultCategories();
    settings.categories = categories;
  }
  
  if (categories[type] && categories[type][index] !== undefined) {
    categories[type].splice(index, 1);
    settings.categories = categories;
    localStorage.setItem('moneynest_settings', JSON.stringify(settings));
    loadCategories();
  }
}

// ================================================
// FUNÇÕES: Perfil
// ================================================
function loadUserProfile() {
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  const nameInput = document.getElementById('settingName');
  const emailInput = document.getElementById('settingEmail');
  
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    nameInput.value = `${user.firstName} ${user.lastName}`;
    emailInput.value = user.email;
  } else {
    nameInput.value = '';
    emailInput.value = '';
  }
}

function toggleEditProfile() {
  const nameInput = document.getElementById('settingName');
  const emailInput = document.getElementById('settingEmail');
  const editBtns = document.querySelectorAll('.btn-edit');
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  
  if (!loggedInUser) return;
  
  isEditingProfile = !isEditingProfile;
  
  if (isEditingProfile) {
    nameInput.disabled = false;
    emailInput.disabled = false;
    editBtns.forEach(btn => {
      btn.textContent = '✓';
      btn.classList.add('active');
    });
    nameInput.focus();
  } else {
    nameInput.disabled = true;
    emailInput.disabled = true;
    editBtns.forEach(btn => {
      btn.textContent = '✏️';
      btn.classList.remove('active');
    });
  }
}

function saveProfileChanges() {
  const nameInput = document.getElementById('settingName');
  const emailInput = document.getElementById('settingEmail');
  const editBtns = document.querySelectorAll('.btn-edit');
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  
  if (!loggedInUser) return;
  
  const user = JSON.parse(loggedInUser);
  const nameParts = nameInput.value.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = emailInput.value.trim();
  
  localStorage.setItem('moneynest_loggedIn', JSON.stringify(user));
  
  const users = JSON.parse(localStorage.getItem('moneynest_users') || '[]');
  const userIndex = users.findIndex(u => u.email === user.email);
  if (userIndex !== -1) {
    users[userIndex].firstName = firstName;
    users[userIndex].lastName = lastName;
    users[userIndex].email = emailInput.value.trim();
    localStorage.setItem('moneynest_users', JSON.stringify(users));
  }
  
  nameInput.disabled = true;
  emailInput.disabled = true;
  editBtns.forEach(btn => {
    btn.textContent = '✏️';
    btn.classList.remove('active');
  });
  isEditingProfile = false;
  
  const btn = document.querySelector('.btn-save');
  const originalText = btn.textContent;
  btn.textContent = '✓';
  btn.style.background = 'var(--green)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
}

// ================================================
// FUNÇÕES: Palavra-passe
// ================================================
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.querySelector('span').textContent = '🙈';
  } else {
    input.type = 'password';
    btn.querySelector('span').textContent = '👁';
  }
}

function openPasswordModal() {
  const modal = document.getElementById('passwordModal');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  document.getElementById('modalMessage').className = 'modal-message';
  document.getElementById('modalMessage').textContent = '';
  
  document.getElementById('modalTitle').textContent = t.changePassword;
  document.getElementById('currentPassLabel').textContent = t.currentPassword || 'Palavra-passe atual';
  document.getElementById('newPassLabel').textContent = t.newPassword || 'Nova palavra-passe';
  document.getElementById('confirmPassLabel').textContent = t.confirmPassword || 'Confirmar nova palavra-passe';
  document.getElementById('cancelBtn').textContent = t.cancel || 'Cancelar';
  document.getElementById('confirmBtn').textContent = t.confirm || 'Alterar';
  
  modal.classList.add('active');
}

function closePasswordModal() {
  document.getElementById('passwordModal').classList.remove('active');
}

function submitPasswordChange() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageEl = document.getElementById('modalMessage');
  
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  messageEl.className = 'modal-message';
  
  const users = JSON.parse(localStorage.getItem('moneynest_users') || '[]');
  const loggedInUser = JSON.parse(localStorage.getItem('moneynest_loggedIn'));
  
  if (!loggedInUser) {
    messageEl.textContent = t.notLoggedIn || 'Precisa de iniciar sessão para alterar a palavra-passe.';
    messageEl.classList.add('error');
    return;
  }
  
  const userIndex = users.findIndex(u => u.email === loggedInUser.email);
  if (userIndex === -1) {
    messageEl.textContent = t.userNotFound || 'Utilizador não encontrado.';
    messageEl.classList.add('error');
    return;
  }
  
  const user = users[userIndex];
  
  if (user.password !== currentPassword) {
    messageEl.textContent = t.wrongPassword || 'Palavra-passe atual incorreta.';
    messageEl.classList.add('error');
    return;
  }
  
  if (newPassword.length < 6) {
    messageEl.textContent = t.passwordTooShort || 'A nova palavra-passe deve ter pelo menos 6 caracteres.';
    messageEl.classList.add('error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    messageEl.textContent = t.passwordMismatch || 'As palavras-passe não coincidem.';
    messageEl.classList.add('error');
    return;
  }
  
  users[userIndex].password = newPassword;
  localStorage.setItem('moneynest_users', JSON.stringify(users));
  
  messageEl.textContent = t.passwordChanged || 'Palavra-passe alterada com sucesso!';
  messageEl.classList.add('success');
  
  setTimeout(() => { closePasswordModal(); }, 1500);
}

// ================================================
// FUNÇÕES: Tema
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
// FUNÇÕES: Idioma
// ================================================
function applyLanguageSettings() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];

  document.querySelector('.settings-header h1').textContent = t.title;
  document.querySelector('.settings-header p').textContent = t.subtitle;
  document.querySelector('.btn-save').textContent = t.save;
  document.querySelector('.btn-reset').textContent = t.reset;
  document.querySelector('.btn-back').textContent = t.back;

  document.querySelectorAll('.settings-section h2')[0].textContent = '👤 ' + t.account;
  document.querySelectorAll('.settings-section h2')[1].textContent = '🔔 ' + t.notifications;
  document.querySelectorAll('.settings-section h2')[2].textContent = '🔒 ' + t.security;
  document.querySelectorAll('.settings-section h2')[3].textContent = '🎨 ' + t.appearance;
  document.querySelectorAll('.settings-section h2')[4].textContent = '🌐 ' + t.language;

  const sections = document.querySelectorAll('.setting-item');
  sections[0].querySelector('.setting-label').textContent = t.name;
  sections[0].querySelector('.setting-desc').textContent = t.nameDesc;
  sections[1].querySelector('.setting-label').textContent = t.email;
  sections[1].querySelector('.setting-desc').textContent = t.emailDesc;
  sections[2].querySelector('.setting-label').textContent = t.currency;
  sections[2].querySelector('.setting-desc').textContent = t.currencyDesc;
  sections[3].querySelector('.setting-label').textContent = t.notifEmail;
  sections[3].querySelector('.setting-desc').textContent = t.notifEmailDesc;
  sections[4].querySelector('.setting-label').textContent = t.notifExpense;
  sections[4].querySelector('.setting-desc').textContent = t.notifExpenseDesc;
  sections[5].querySelector('.setting-label').textContent = t.notifReport;
  sections[5].querySelector('.setting-desc').textContent = t.notifReportDesc;
  sections[6].querySelector('.setting-label').textContent = t.twoFactor;
  sections[6].querySelector('.setting-desc').textContent = t.twoFactorDesc;
  sections[7].querySelector('.setting-label').textContent = t.sessionLock;
  sections[7].querySelector('.setting-desc').textContent = t.sessionLockDesc;
  sections[8].querySelector('.setting-label').textContent = t.changePassword;
  sections[8].querySelector('.setting-desc').textContent = t.changePasswordDesc;
  sections[8].querySelector('.btn-change').textContent = t.changeBtn;
  sections[9].querySelector('.setting-label').textContent = t.theme;
  sections[9].querySelector('.setting-desc').textContent = t.themeDesc;
  sections[10].querySelector('.setting-label').textContent = t.ecoMode;
  sections[10].querySelector('.setting-desc').textContent = t.ecoModeDesc;
  sections[11].querySelector('.setting-label').textContent = t.interfaceLang;
  sections[11].querySelector('.setting-desc').textContent = t.interfaceLangDesc;
  sections[12].querySelector('.setting-label').textContent = t.dateFormat;
  sections[12].querySelector('.setting-desc').textContent = t.dateFormatDesc;

  document.querySelectorAll('.months li').forEach((li, index) => {
    li.textContent = t.months[index];
  });

  if (lang === 'pt-PT' || lang === 'pt-BR') {
    document.querySelector('.btn-reset').setAttribute('onclick', "if(confirm('" + t.resetConfirm + "')){localStorage.removeItem('moneynest_settings');location.reload();}");
  }

  if (document.getElementById('incomeCategoriesTitle')) {
    document.getElementById('incomeCategoriesTitle').textContent = t.incomeCategories;
  }
  if (document.getElementById('expenseCategoriesTitle')) {
    document.getElementById('expenseCategoriesTitle').textContent = t.expenseCategories;
  }
}

// ================================================
// FUNÇÕES: Settings
// ================================================
function loadSettings() {
  const saved = localStorage.getItem('moneynest_settings');
  if (saved) {
    const settings = JSON.parse(saved);
    document.getElementById('settingName').value = settings.name || 'Utilizador';
    document.getElementById('settingEmail').value = settings.email || 'utilizador@email.com';
    document.getElementById('settingCurrency').value = settings.currency || 'BRL';
    document.getElementById('notifEmail').checked = settings.notifEmail !== undefined ? settings.notifEmail : true;
    document.getElementById('notifExpense').checked = settings.notifExpense !== undefined ? settings.notifExpense : true;
    document.getElementById('notifReport').checked = settings.notifReport || false;
    document.getElementById('2fa').checked = settings.twoFactor || false;
    document.getElementById('sessionLock').checked = settings.sessionLock || false;
    document.getElementById('settingTheme').value = settings.theme || 'dark';
    document.getElementById('ecoMode').checked = settings.ecoMode || false;
    document.getElementById('settingLang').value = settings.language || 'pt-PT';
    document.getElementById('settingDateFormat').value = settings.dateFormat || 'dd/mm/yyyy';
  }
}

function saveSettings() {
  const existingSettings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const settings = {
    ...existingSettings,
    name: document.getElementById('settingName').value,
    email: document.getElementById('settingEmail').value,
    currency: document.getElementById('settingCurrency').value,
    notifEmail: document.getElementById('notifEmail').checked,
    notifExpense: document.getElementById('notifExpense').checked,
    notifReport: document.getElementById('notifReport').checked,
    twoFactor: document.getElementById('2fa').checked,
    sessionLock: document.getElementById('sessionLock').checked,
    theme: document.getElementById('settingTheme').value,
    ecoMode: document.getElementById('ecoMode').checked,
    language: document.getElementById('settingLang').value,
    dateFormat: document.getElementById('settingDateFormat').value
  };
  
  localStorage.setItem('moneynest_settings', JSON.stringify(settings));
  applyLanguageSettings();
  
  const btn = document.querySelector('.btn-save');
  const originalText = btn.textContent;
  btn.textContent = '✓';
  btn.style.background = 'var(--green)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
}

function resetSettings() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  
  if (confirm(t.resetConfirm)) {
    localStorage.removeItem('moneynest_settings');
    location.reload();
  }
}

// ================================================
// EVENTO: DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  loadUserProfile();
  loadAndApplyTheme();
  applyLanguageSettings();
  loadCategories();
  
  const hoje = new Date();
  document.querySelectorAll('.months li').forEach((li, index) => {
    li.classList.remove('active');
    if (index === hoje.getMonth()) li.classList.add('active');
  });

  document.getElementById('settingLang').addEventListener('change', function() {
    const saved = localStorage.getItem('moneynest_settings');
    const currentSettings = saved ? JSON.parse(saved) : {};
    currentSettings.language = this.value;
    localStorage.setItem('moneynest_settings', JSON.stringify(currentSettings));
    applyLanguageSettings();
    loadCategories();
  });

  document.getElementById('settingTheme').addEventListener('change', function() {
    const saved = localStorage.getItem('moneynest_settings');
    const currentSettings = saved ? JSON.parse(saved) : {};
    currentSettings.theme = this.value;
    localStorage.setItem('moneynest_settings', JSON.stringify(currentSettings));
    applyTheme(this.value);
  });

  document.getElementById('settingName').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isEditingProfile) saveProfileChanges();
  });

  document.getElementById('settingEmail').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isEditingProfile) saveProfileChanges();
  });

  document.getElementById('passwordModal').addEventListener('click', function(e) {
    if (e.target === this) closePasswordModal();
  });

  document.getElementById('categoryModal').addEventListener('click', function(e) {
    if (e.target === this) closeCategoryModal();
  });

  document.getElementById('newCategoryName').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addCategory();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePasswordModal();
      closeCategoryModal();
    }
  });
});

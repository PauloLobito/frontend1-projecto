// ================================================
// MONEY NEST - SETTINGS JAVASCRIPT
// ================================================

// Traduções
const translations = {
  'pt-PT': {
    title: 'Definições',
    subtitle: 'Gerir as suas preferências e configurações',
    save: 'Guardar Alterações',
    reset: 'Restaurar Padrão',
    back: '← Voltar',
    account: 'Conta',
    notifications: 'Notificações',
    security: 'Segurança',
    appearance: 'Aspeto',
    language: 'Idioma',
    name: 'Nome',
    nameDesc: 'O seu nome completo',
    email: 'Email',
    emailDesc: 'Email associado à conta',
    currency: 'Moeda',
    currencyDesc: 'Moeda preferida para visualização',
    notifEmail: 'Notificações por email',
    notifEmailDesc: 'Receber alertas por email',
    notifExpense: 'Alertas de despesas',
    notifExpenseDesc: 'Notificar quando gastar acima do limite',
    notifReport: 'Relatórios mensais',
    notifReportDesc: 'Resumo do mês por email',
    twoFactor: 'Autenticação de dois fatores',
    twoFactorDesc: 'Adicionar uma camada extra de segurança',
    sessionLock: 'Bloqueio de sessão',
    sessionLockDesc: 'Bloquear após 15 minutos de inatividade',
    changePassword: 'Alterar palavra-passe',
    changePasswordDesc: 'Atualizar a sua palavra-passe',
    changeBtn: 'Alterar',
    theme: 'Tema',
    themeDesc: 'Escolher o tema da aplicação',
    ecoMode: 'Modo de economia',
    ecoModeDesc: 'Redução do consumo de energia',
    interfaceLang: 'Idioma da interface',
    interfaceLangDesc: 'Idioma utilizado na aplicação',
    dateFormat: 'Formato de data',
    dateFormatDesc: 'Formato de apresentação das datas',
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    resetConfirm: 'Tem a certeza que deseja restaurar as definições padrão?'
  },
  'pt-BR': {
    title: 'Configurações',
    subtitle: 'Gerenciar suas preferências e configurações',
    save: 'Salvar Alterações',
    reset: 'Restaurar Padrão',
    back: '← Voltar',
    account: 'Conta',
    notifications: 'Notificações',
    security: 'Segurança',
    appearance: 'Aparência',
    language: 'Idioma',
    name: 'Nome',
    nameDesc: 'Seu nome completo',
    email: 'Email',
    emailDesc: 'Email associado à conta',
    currency: 'Moeda',
    currencyDesc: 'Moeda preferida para exibição',
    notifEmail: 'Notificações por email',
    notifEmailDesc: 'Receber alertas por email',
    notifExpense: 'Alertas de despesas',
    notifExpenseDesc: 'Notificar quando gastar acima do limite',
    notifReport: 'Relatórios mensais',
    notifReportDesc: 'Resumo do mês por email',
    twoFactor: 'Autenticação de dois fatores',
    twoFactorDesc: 'Adicionar uma camada extra de segurança',
    sessionLock: 'Bloqueio de sessão',
    sessionLockDesc: 'Bloquear após 15 minutos de inatividade',
    changePassword: 'Alterar senha',
    changePasswordDesc: 'Atualizar sua senha',
    changeBtn: 'Alterar',
    theme: 'Tema',
    themeDesc: 'Escolher o tema da aplicação',
    ecoMode: 'Modo economia',
    ecoModeDesc: 'Redução do consumo de energia',
    interfaceLang: 'Idioma da interface',
    interfaceLangDesc: 'Idioma utilizado na aplicação',
    dateFormat: 'Formato de data',
    dateFormatDesc: 'Formato de apresentação das datas',
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    resetConfirm: 'Tem certeza que deseja restaurar as configurações padrão?'
  },
  'en': {
    title: 'Settings',
    subtitle: 'Manage your preferences and configurations',
    save: 'Save Changes',
    reset: 'Reset to Default',
    back: '← Back',
    account: 'Account',
    notifications: 'Notifications',
    security: 'Security',
    appearance: 'Appearance',
    language: 'Language',
    name: 'Name',
    nameDesc: 'Your full name',
    email: 'Email',
    emailDesc: 'Email associated with account',
    currency: 'Currency',
    currencyDesc: 'Preferred currency for display',
    notifEmail: 'Email notifications',
    notifEmailDesc: 'Receive alerts by email',
    notifExpense: 'Expense alerts',
    notifExpenseDesc: 'Notify when spending above limit',
    notifReport: 'Monthly reports',
    notifReportDesc: 'Month summary by email',
    twoFactor: 'Two-factor authentication',
    twoFactorDesc: 'Add an extra layer of security',
    sessionLock: 'Session lock',
    sessionLockDesc: 'Lock after 15 minutes of inactivity',
    changePassword: 'Change password',
    changePasswordDesc: 'Update your password',
    changeBtn: 'Change',
    theme: 'Theme',
    themeDesc: 'Choose the application theme',
    ecoMode: 'Eco mode',
    ecoModeDesc: 'Reduce energy consumption',
    interfaceLang: 'Interface language',
    interfaceLangDesc: 'Language used in the application',
    dateFormat: 'Date format',
    dateFormatDesc: 'Date display format',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    resetConfirm: 'Are you sure you want to reset to default settings?'
  },
  'es': {
    title: 'Configuración',
    subtitle: 'Gestionar sus preferencias y configuraciones',
    save: 'Guardar Cambios',
    reset: 'Restablecer Predeterminado',
    back: '← Volver',
    account: 'Cuenta',
    notifications: 'Notificaciones',
    security: 'Seguridad',
    appearance: 'Apariencia',
    language: 'Idioma',
    name: 'Nombre',
    nameDesc: 'Su nombre completo',
    email: 'Email',
    emailDesc: 'Email asociado a la cuenta',
    currency: 'Moneda',
    currencyDesc: 'Moneda preferida para visualización',
    notifEmail: 'Notificaciones por email',
    notifEmailDesc: 'Recibir alertas por email',
    notifExpense: 'Alertas de gastos',
    notifExpenseDesc: 'Notificar cuando gaste por encima del límite',
    notifReport: 'Informes mensuales',
    notifReportDesc: 'Resumen del mes por email',
    twoFactor: 'Autenticación de dos factores',
    twoFactorDesc: 'Añadir una capa extra de seguridad',
    sessionLock: 'Bloqueo de sesión',
    sessionLockDesc: 'Bloquear después de 15 minutos de inactividad',
    changePassword: 'Cambiar contraseña',
    changePasswordDesc: 'Actualizar su contraseña',
    changeBtn: 'Cambiar',
    theme: 'Tema',
    themeDesc: 'Elegir el tema de la aplicación',
    ecoMode: 'Modo ahorro',
    ecoModeDesc: 'Reducción del consumo de energía',
    interfaceLang: 'Idioma de la interfaz',
    interfaceLangDesc: 'Idioma utilizado en la aplicación',
    dateFormat: 'Formato de fecha',
    dateFormatDesc: 'Formato de presentación de fechas',
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    resetConfirm: '¿Está seguro de que desea restablecer la configuración predeterminada?'
  }
};

// ================================================
// FUNÇÃO: applyLanguageSettings
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
}

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
// FUNÇÃO: saveSettings
// ================================================
function saveSettings() {
  const settings = {
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

// ================================================
// FUNÇÃO: resetSettings
// ================================================
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
// FUNÇÃO: loadSettings
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

// ================================================
// EVENTO: DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  loadAndApplyTheme();
  applyLanguageSettings();
  
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
  });

  document.getElementById('settingTheme').addEventListener('change', function() {
    const saved = localStorage.getItem('moneynest_settings');
    const currentSettings = saved ? JSON.parse(saved) : {};
    currentSettings.theme = this.value;
    localStorage.setItem('moneynest_settings', JSON.stringify(currentSettings));
    applyTheme(this.value);
  });
});

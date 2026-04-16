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
    resetConfirm: 'Tem a certeza que deseja restaurar as definições padrão?',
    currentPassword: 'Palavra-passe atual',
    newPassword: 'Nova palavra-passe',
    confirmPassword: 'Confirmar nova palavra-passe',
    cancel: 'Cancelar',
    confirm: 'Alterar',
    notLoggedIn: 'Precisa de iniciar sessão para alterar a palavra-passe.',
    userNotFound: 'Utilizador não encontrado.',
    wrongPassword: 'Palavra-passe atual incorreta.',
    passwordTooShort: 'A nova palavra-passe deve ter pelo menos 6 caracteres.',
    passwordMismatch: 'As palavras-passe não coincidem.',
    passwordChanged: 'Palavra-passe alterada com sucesso!',
    editProfile: 'Editar perfil',
    saveProfile: 'Guardar',
    cancelEdit: 'Cancelar',
    profileUpdated: 'Perfil atualizado com sucesso!',
    notLoggedInProfile: 'Inicie sessão para ver o seu perfil.',
    guestUser: 'Visitante',
    guestEmail: 'visitante@moneynest.com'
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
    resetConfirm: 'Tem certeza que deseja restaurar as configurações padrão?',
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar nova senha',
    cancel: 'Cancelar',
    confirm: 'Alterar',
    notLoggedIn: 'Você precisa estar logado para alterar a senha.',
    userNotFound: 'Usuário não encontrado.',
    wrongPassword: 'Senha atual incorreta.',
    passwordTooShort: 'A nova senha deve ter pelo menos 6 caracteres.',
    passwordMismatch: 'As senhas não coincidem.',
    passwordChanged: 'Senha alterada com sucesso!',
    editProfile: 'Editar perfil',
    saveProfile: 'Guardar',
    cancelEdit: 'Cancelar',
    profileUpdated: 'Perfil atualizado com sucesso!',
    notLoggedInProfile: 'Faça login para ver o seu perfil.',
    guestUser: 'Visitante',
    guestEmail: 'visitante@moneynest.com'
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
    resetConfirm: 'Are you sure you want to reset to default settings?',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    cancel: 'Cancel',
    confirm: 'Change',
    notLoggedIn: 'You need to be logged in to change your password.',
    userNotFound: 'User not found.',
    wrongPassword: 'Current password is incorrect.',
    passwordTooShort: 'New password must be at least 6 characters.',
    passwordMismatch: 'Passwords do not match.',
    passwordChanged: 'Password changed successfully!',
    editProfile: 'Edit profile',
    saveProfile: 'Save',
    cancelEdit: 'Cancel',
    profileUpdated: 'Profile updated successfully!',
    notLoggedInProfile: 'Log in to view your profile.',
    guestUser: 'Guest',
    guestEmail: 'guest@moneynest.com'
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
    resetConfirm: '¿Está seguro de que desea restablecer la configuración predeterminada?',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmPassword: 'Confirmar nueva contraseña',
    cancel: 'Cancelar',
    confirm: 'Cambiar',
    notLoggedIn: 'Debes iniciar sesión para cambiar tu contraseña.',
    userNotFound: 'Usuario no encontrado.',
    wrongPassword: 'Contraseña actual incorrecta.',
    passwordTooShort: 'La nueva contraseña debe tener al menos 6 caracteres.',
    passwordMismatch: 'Las contraseñas no coinciden.',
    passwordChanged: '¡Contraseña cambiada con éxito!',
    editProfile: 'Editar perfil',
    saveProfile: 'Guardar',
    cancelEdit: 'Cancelar',
    profileUpdated: '¡Perfil actualizado con éxito!',
    notLoggedInProfile: 'Inicia sesión para ver tu perfil.',
    guestUser: 'Invitado',
    guestEmail: 'invitado@moneynest.com'
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
// FUNÇÃO: loadUserProfile
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

// ================================================
// VARIÁVEL: isEditingProfile
// ================================================
let isEditingProfile = false;

// ================================================
// FUNÇÃO: toggleEditProfile
// ================================================
function toggleEditProfile() {
  const nameInput = document.getElementById('settingName');
  const emailInput = document.getElementById('settingEmail');
  const editBtns = document.querySelectorAll('.btn-edit');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  
  if (!loggedInUser) {
    return;
  }
  
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

// ================================================
// FUNÇÃO: saveProfileChanges
// ================================================
function saveProfileChanges() {
  const nameInput = document.getElementById('settingName');
  const emailInput = document.getElementById('settingEmail');
  const editBtns = document.querySelectorAll('.btn-edit');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const lang = settings.language || 'pt-PT';
  const t = translations[lang];
  const loggedInUser = localStorage.getItem('moneynest_loggedIn');
  
  if (!loggedInUser) {
    return;
  }
  
  const user = JSON.parse(loggedInUser);
  const nameParts = nameInput.value.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = emailInput.value.trim();
  
  localStorage.setItem('moneynest_loggedIn', JSON.stringify(user));
  
  const users = JSON.parse(localStorage.getItem('moneynest_users') || '[]');
  const userIndex = users.findIndex(u => u.email === user.email || u.email === emailInput.dataset.originalEmail);
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
// FUNÇÃO: togglePassword
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

// ================================================
// FUNÇÃO: openPasswordModal
// ================================================
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

// ================================================
// FUNÇÃO: closePasswordModal
// ================================================
function closePasswordModal() {
  document.getElementById('passwordModal').classList.remove('active');
}

// ================================================
// FUNÇÃO: submitPasswordChange
// ================================================
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
  
  setTimeout(() => {
    closePasswordModal();
  }, 1500);
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
  loadUserProfile();
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

  document.getElementById('settingName').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isEditingProfile) {
      saveProfileChanges();
    }
  });

  document.getElementById('settingEmail').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isEditingProfile) {
      saveProfileChanges();
    }
  });

  document.getElementById('passwordModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closePasswordModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePasswordModal();
    }
  });
});

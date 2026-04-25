/**
 * ================================================
 * MONEY NEST - NOTIFICATIONS SYSTEM (com condições)
 * ================================================
 */

let notifications = [];
let customNotifications = [];

function hasSwal() {
  return typeof Swal !== 'undefined';
}

function swalAlert(config) {
  if (hasSwal()) {
    return Swal.fire(config);
  }

  if (config.icon === 'error' || config.icon === 'warning') {
    alert(config.title || config.text || 'Ocorreu um erro.');
  } else {
    alert(config.title || config.text || 'Operação concluída.');
  }
  return Promise.resolve();
}

function swalConfirm(config) {
  if (hasSwal()) {
    return Swal.fire(config).then(result => result.isConfirmed);
  }
  return Promise.resolve(confirm(config.text || 'Tem certeza?'));
}

function initNotifications() {
  try {
    console.log('[initNotifications] Checking localStorage...');
    console.log('[initNotifications] Keys:', Object.keys(localStorage).filter(k => k.includes('moneynest')));

    const stored = localStorage.getItem('moneynest_notifications');
    notifications = stored ? JSON.parse(stored) : [];

    const storedCustom = localStorage.getItem('moneynest_custom_notifications');
    console.log('[initNotifications] Raw custom data:', storedCustom);
    customNotifications = storedCustom ? JSON.parse(storedCustom) : [];

    console.log('[initNotifications] Loaded notifications:', notifications.length, 'custom:', customNotifications.length);

    checkConditions();
    renderNotifications();
  } catch (e) {
    console.error('[Notifications] Erro:', e);
  }
}

function checkConditions() {
  console.log('[checkConditions] Starting...');
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const customStored = localStorage.getItem('moneynest_custom_notifications');
  customNotifications = customStored ? JSON.parse(customStored) : [];

  console.log('[checkConditions] customNotifications:', customNotifications.length);
  console.log('[checkConditions] notifications:', notifications.length);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const today = now.toISOString().split('T')[0];
  const day = now.getDate();

  const monthRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const income = monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expenses = monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const balance = income - expenses;

  console.log('[checkConditions] Balance:', balance, 'Income:', income, 'Expenses:', expenses);
  console.log('[checkConditions] Custom notifications to check:', customNotifications.length);

  const newNotifications = [];

  customNotifications.forEach(custom => {
    const alreadyShown = notifications.some(n => n.customId === custom.id && n.date === today);
    if (alreadyShown) return;

    let shouldTrigger = false;

    switch (custom.condition) {
      case 'daily':
        shouldTrigger = true;
        break;
      case 'month_start':
        shouldTrigger = day === 1;
        break;
      case 'month_end':
        shouldTrigger = day >= 25;
        break;
      case 'balance_negative':
        shouldTrigger = balance < 0;
        break;
      case 'balance_positive':
        shouldTrigger = balance > 0;
        break;
    }

    if (shouldTrigger) {
      newNotifications.push({
        id: Date.now(),
        type: 'custom',
        title: '🔔 Lembrete',
        message: custom.message,
        date: today,
        read: false,
        customId: custom.id
      });
      custom.triggered = true;
    }
  });

  if (newNotifications.length > 0) {
    notifications = [...notifications, ...newNotifications];
    if (notifications.length > 10) notifications = notifications.slice(-10);
    localStorage.setItem('moneynest_notifications', JSON.stringify(notifications));
    localStorage.setItem('moneynest_custom_notifications', JSON.stringify(customNotifications));
  }
}

function renderNotifications() {
  console.log('[renderNotifications] Running...');
  console.log('[renderNotifications] notifications:', notifications.length);
  console.log('[renderNotifications] customNotifications:', customNotifications.length);

  const container = document.querySelector('.notification');
  const badge = document.querySelector('.notification-badge');

  if (!container) return;

  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const income = monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expenses = monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const balance = income - expenses;

  const activeNotifications = notifications.filter(n => {
    const custom = customNotifications.find(c => c.id === n.customId);
    if (!custom) return false;

    switch (custom.condition) {
      case 'daily': return true;
      case 'month_start': return now.getDate() === 1;
      case 'month_end': return now.getDate() >= 25;
      case 'balance_negative': return balance < 0;
      case 'balance_positive': return balance > 0;
      default: return true;
    }
  });

  const unreadCount = activeNotifications.filter(n => !n.read).length;
  if (badge) badge.textContent = unreadCount > 0 ? `🔔(${unreadCount})` : '💬';

  if (activeNotifications.length > 0) {
    const latest = activeNotifications[activeNotifications.length - 1];
    container.innerHTML = `
      <div class="notification-item ${latest.read ? 'read' : 'unread'}">
        <strong>${latest.title}</strong>
        <p>${latest.message}</p>
        <small>${latest.date}</small>
      </div>
    `;
  } else {
    container.textContent = 'Sem notificações ativas.';
  }
}

function openCustomNotificationModal() {
  const modal = document.getElementById('customNotificationModal');
  if (modal) modal.classList.add('active');
}

function closeCustomNotificationModal() {
  const modal = document.getElementById('customNotificationModal');
  if (modal) modal.classList.remove('active');
}

function createCustomNotification() {
  const message = document.getElementById('customNotificationMessage').value.trim();
  const selectEl = document.getElementById('notificationConditionSelect');
  let condition = 'daily';
  let conditionText = 'Todos os dias';

  if (selectEl) {
    const selected = selectEl.querySelector('.custom-select-option.selected');
    if (selected) {
      condition = selected.dataset.value;
      conditionText = selected.textContent;
    }
  }

  if (!message) {
    swalAlert({
      icon: 'warning',
      title: 'Mensagem obrigatória',
      text: 'Escreva uma mensagem para a notificação.'
    });
    return;
  }

  const customNotif = {
    id: Date.now(),
    message: message,
    condition: condition,
    conditionText: conditionText,
    triggered: false,
    createdAt: new Date().toISOString().split('T')[0]
  };

  customNotifications.push(customNotif);
  localStorage.setItem('moneynest_custom_notifications', JSON.stringify(customNotifications));

  document.getElementById('customNotificationMessage').value = '';
  closeCustomNotificationModal();

  checkConditions();
  renderNotifications();
  swalAlert({
    icon: 'success',
    title: 'Notificação criada!'
  });
}

// Called from dashboard when records change - this is triggered automatically
function refreshNotificationDisplay() {
  console.log('[refreshNotificationDisplay] Refreshing...');
  checkConditions();
  renderNotifications();
}

function listCustomNotifications() {
  const stored = localStorage.getItem('moneynest_custom_notifications');
  customNotifications = stored ? JSON.parse(stored) : [];

  console.log('[listCustomNotifications] Loaded:', customNotifications.length);

  if (customNotifications.length === 0) {
    swalAlert({
      icon: 'info',
      title: 'Sem notificações',
      text: 'Não tem notificações criadas.'
    });
    return;
  }

  let list = 'Notificações Criadas:\n\n';
  customNotifications.forEach((n, i) => {
    const status = n.triggered ? '✅' : '⏳';
    list += `${i + 1}. ${n.message}\n   ${status} ${n.conditionText}\n`;
  });
  list += '\n\nQuer eliminar todas?';

  const listHtml = customNotifications
    .map((n, i) => {
      const status = n.triggered ? '✅' : '⏳';
      return `${i + 1}. ${n.message}<br><small>${status} ${n.conditionText}</small>`;
    })
    .join('<br><br>');

  swalConfirm({
    icon: 'warning',
    title: 'Eliminar todas as notificações?',
    html: `${listHtml}<br><br><strong>Esta ação não pode ser revertida.</strong>`,
    text: list,
    showCancelButton: true,
    confirmButtonText: 'Sim, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    reverseButtons: true
  }).then(confirmed => {
    if (!confirmed) return;

    customNotifications = [];
    notifications = [];
    localStorage.setItem('moneynest_custom_notifications', JSON.stringify([]));
    localStorage.setItem('moneynest_notifications', JSON.stringify([]));
    renderNotifications();

    swalAlert({
      icon: 'success',
      title: 'Notificações eliminadas'
    });
  });
}
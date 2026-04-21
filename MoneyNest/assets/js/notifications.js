/**
 * ================================================
 * MONEY NEST - NOTIFICATIONS SYSTEM (com condições)
 * ================================================
 */

let notifications = [];
let customNotifications = [];

function initNotifications() {
  try {
    const stored = localStorage.getItem('moneynest_notifications');
    notifications = stored ? JSON.parse(stored) : [];
    
    const storedCustom = localStorage.getItem('moneynest_custom_notifications');
    customNotifications = storedCustom ? JSON.parse(storedCustom) : [];
    
    checkConditions();
    renderNotifications();
  } catch (e) {
    console.error('[Notifications] Erro:', e);
  }
}

function checkConditions() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
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
  
  const newNotifications = [];
  
  customNotifications.forEach(custom => {
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
      const alreadyShown = notifications.some(n => n.customId === custom.id && n.date === today);
      if (alreadyShown) return;
    
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
        shouldTrigger = balance > 0 && income > 0;
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
    alert('Escreva uma mensagem!');
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
  alert('Notificação criada!');
}

function listCustomNotifications() {
  if (customNotifications.length === 0) {
    alert('Não tem notificações.');
    return;
  }
  
  let list = 'Notificações Criadas:\n\n';
  customNotifications.forEach((n, i) => {
    const status = n.triggered ? '✅' : '⏳';
    list += `${i + 1}. ${n.message}\n   ${status} ${n.conditionText}\n`;
  });
  list += '\n\nQuer eliminar todas?';
  
  if (confirm(list)) {
    customNotifications = [];
    notifications = [];
    localStorage.setItem('moneynest_custom_notifications', JSON.stringify([]));
    localStorage.setItem('moneynest_notifications', JSON.stringify([]));
    renderNotifications();
  }
}
/**
 * ================================================
 * MONEY NEST - NOTIFICATIONS SYSTEM (só personalizadas)
 * ================================================
 */

let notifications = [];

function initNotifications() {
  try {
    const stored = localStorage.getItem('moneynest_notifications');
    notifications = stored ? JSON.parse(stored) : [];
    renderNotifications();
  } catch (e) {
    console.error('[Notifications] Erro:', e);
  }
}

function renderNotifications() {
  const container = document.querySelector('.notification');
  const badge = document.querySelector('.notification-badge');
  
  if (!container) return;
  
  const unreadCount = notifications.filter(n => !n.read).length;
  if (badge) badge.textContent = unreadCount > 0 ? `🔔(${unreadCount})` : '💬';
  
  if (notifications.length > 0) {
    const latest = notifications[notifications.length - 1];
    container.innerHTML = `
      <div class="notification-item ${latest.read ? 'read' : 'unread'}">
        <strong>${latest.title}</strong>
        <p>${latest.message}</p>
        <small>${latest.date}</small>
      </div>
    `;
  } else {
    container.textContent = 'Sem notificações.';
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
  const condition = document.getElementById('customNotificationCondition').value;
  
  if (!message) {
    alert('Escreva uma mensagem!');
    return;
  }
  
  const now = new Date();
  notifications.push({
    id: Date.now(),
    type: 'custom',
    title: '🔔 Lembrete',
    message: message,
    condition: condition,
    date: now.toISOString().split('T')[0],
    read: false,
    triggered: false
  });
  
  localStorage.setItem('moneynest_notifications', JSON.stringify(notifications));
  document.getElementById('customNotificationMessage').value = '';
  closeCustomNotificationModal();
  renderNotifications();
  alert('Notificação criada!');
}

function listCustomNotifications() {
  if (notifications.length === 0) {
    alert('Não tem notificações.');
    return;
  }
  
  let list = 'Notificações:\n\n';
  notifications.forEach((n, i) => {
    list += `${i + 1}. ${n.message}\n`;
  });
  list += '\nQuer eliminar todas?';
  
  if (confirm(list)) {
    notifications = [];
    localStorage.setItem('moneynest_notifications', JSON.stringify(notifications));
    renderNotifications();
  }
}
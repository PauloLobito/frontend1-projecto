/**
 * ================================================
 * MONEY NEST - NOTIFICATIONS SYSTEM
 * ================================================
 * Sistema de notificações com suporte a notificações automáticas
 * e criadas pelo utilizador.
 */

// Helper para formatar moeda
function formatCurrencyLocal(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

let notifications = [];
let customNotifications = [];

/**
 * Inicializar sistema de notificações
 */
function initNotifications() {
  try {
    console.log('[Notifications] Inicializando...');
    
    // Carregar notificações automáticas
    const stored = localStorage.getItem('moneynest_notifications');
    notifications = stored ? JSON.parse(stored) : [];
    
    // Carregar notificações personalizadas
    const storedCustom = localStorage.getItem('moneynest_custom_notifications');
    customNotifications = storedCustom ? JSON.parse(storedCustom) : [];
    
    console.log('[Notifications] Automáticas:', notifications.length, '| Personalizadas:', customNotifications.length);
    
    checkAutomaticNotifications();
    checkCustomNotifications();
    renderNotifications();
    
    console.log('[Notifications] Inicializado!');
  } catch (e) {
    console.error('[Notifications] Erro:', e);
  }
}

/**
 * Verificar notificações automáticas
 */
function checkAutomaticNotifications() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const monthlyGoals = settings.monthlyGoals || {};
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthKey = `${year}-${month}`;
  const goal = monthlyGoals[monthKey] || 0;
  
  const currentMonthRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  
  const income = currentMonthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expenses = currentMonthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const balance = income - expenses;
  const today = now.toISOString().split('T')[0];
  
  const newNotifications = [];
  
  // Meta atingida
  if (goal > 0 && balance >= goal) {
    const exists = notifications.some(n => n.type === 'goal_reached' && n.monthKey === monthKey && !n.read);
    if (!exists) {
      newNotifications.push({
        id: Date.now(),
        type: 'goal_reached',
        title: '🎯 Meta Atingida!',
        message: `Atingiu a meta de R$ ${formatCurrencyLocal(goal)}!`,
        date: today,
        read: false,
        monthKey,
        auto: true
      });
    }
  }
  
  // Saldo negativo
  if (balance < 0) {
    const exists = notifications.some(n => n.type === 'negative_balance' && n.monthKey === monthKey && !n.read);
    if (!exists) {
      newNotifications.push({
        id: Date.now(),
        type: 'negative_balance',
        title: '💸 Saldo Negativo',
        message: `Saldo: R$ ${formatCurrencyLocal(balance)}`,
        date: today,
        read: false,
        monthKey,
        auto: true
      });
    }
  }
  
  if (newNotifications.length > 0) {
    notifications = [...notifications, ...newNotifications];
    saveAutomaticNotifications();
  }
}

/**
 * Verificar notificações personalizadas
 */
function checkCustomNotifications() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  
  const newNotifications = [];
  
  customNotifications.forEach(custom => {
    if (custom.triggered) return;
    
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
        const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
        const records = settings.records || [];
        const monthRecords = records.filter(r => {
          const d = new Date(r.date);
          return d.getMonth() === month && d.getFullYear() === year;
        });
        const income = monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
        const expenses = monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
        shouldTrigger = (income - expenses) < 0;
        break;
      case 'balance_positive':
        const s = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
        const recs = s.records || [];
        const mRecs = recs.filter(r => {
          const d = new Date(r.date);
          return d.getMonth() === month && d.getFullYear() === year;
        });
        const inc = mRecs.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
        const exp = mRecs.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
        shouldTrigger = (inc - exp) > 0;
        break;
      default:
        shouldTrigger = true;
    }
    
    if (shouldTrigger) {
      newNotifications.push({
        id: Date.now(),
        type: 'custom',
        title: '🔔 Lembrete',
        message: custom.message,
        date: today,
        read: false,
        customId: custom.id,
        auto: false
      });
      custom.triggered = true;
    }
  });
  
  if (newNotifications.length > 0) {
    notifications = [...notifications, ...newNotifications];
    saveCustomNotifications();
    saveAutomaticNotifications();
  }
}

/**
 * Guardar notificações automáticas
 */
function saveAutomaticNotifications() {
  if (notifications.length > 10) {
    notifications = notifications.slice(-10);
  }
  localStorage.setItem('moneynest_notifications', JSON.stringify(notifications));
}

/**
 * Guardar notificações personalizadas
 */
function saveCustomNotifications() {
  localStorage.setItem('moneynest_custom_notifications', JSON.stringify(customNotifications));
}

/**
 * Renderizar notificação na UI
 */
function renderNotifications() {
  const container = document.querySelector('.notification');
  const badge = document.querySelector('.notification-badge');
  
  if (!container) return;
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (badge) {
    badge.textContent = unreadCount > 0 ? `🔔(${unreadCount})` : '💬';
  }
  
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
    container.textContent = 'Sem notificações. Crie uma!';
  }
}

/**
 * Abrir modal para criar notificação
 */
function openCustomNotificationModal() {
  const modal = document.getElementById('customNotificationModal');
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Fechar modal
 */
function closeCustomNotificationModal() {
  const modal = document.getElementById('customNotificationModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Criar notificação personalizada
 */
function createCustomNotification() {
  const message = document.getElementById('customNotificationMessage').value.trim();
  const condition = document.getElementById('customNotificationCondition').value;
  
  if (!message) {
    alert('Escreva uma mensagem!');
    return;
  }
  
  const newNotif = {
    id: Date.now(),
    message,
    condition,
    triggered: false,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  customNotifications.push(newNotif);
  saveCustomNotifications();
  
  // Limpar formulário
  document.getElementById('customNotificationMessage').value = '';
  
  closeCustomNotificationModal();
  
  // Verificar imediatamente
  checkCustomNotifications();
  renderNotifications();
  
  alert('Notificação criada com sucesso!');
}

/**
 * Eliminar notificação personalizada
 */
function deleteCustomNotification(id) {
  customNotifications = customNotifications.filter(n => n.id !== id);
  saveCustomNotifications();
  alert('Notificação eliminada!');
}

/**
 * Ver lista de notificações personalizadas
 */
function listCustomNotifications() {
  if (customNotifications.length === 0) {
    alert('Não tem notificações personalizadas.');
    return;
  }
  
  let list = 'Suas Notificações:\n\n';
  customNotifications.forEach((n, i) => {
    list += `${i + 1}. ${n.message} (${n.condition})\n`;
  });
  list += '\nClique em OK para eliminar todas.';
  
  if (confirm(list)) {
    customNotifications = [];
    saveCustomNotifications();
    renderNotifications();
  }
}
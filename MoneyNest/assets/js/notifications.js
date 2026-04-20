/**
 * ================================================
 * MONEY NEST - NOTIFICATIONS SYSTEM
 * ================================================
 * Sistema de notificações que gera alertas automáticos
 * com base nos registos financeiros.
 */

let notifications = [];

/**
 * Inicializar sistema de notificações
 */
function initNotifications() {
  const stored = localStorage.getItem('moneynest_notifications');
  notifications = stored ? JSON.parse(stored) : [];
  checkNotifications();
  renderNotifications();
}

/**
 * Verificar condições para gerar notificações
 */
function checkNotifications() {
  const settings = JSON.parse(localStorage.getItem('moneynest_settings') || '{}');
  const records = settings.records || [];
  const monthlyGoals = settings.monthlyGoals || {};
  const monthKey = `${selectedYear}-${selectedMonth}`;
  const goal = monthlyGoals[monthKey] || 0;
  
  const currentMonthRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });
  
  const income = currentMonthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expenses = currentMonthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const balance = income - expenses;
  const today = new Date().toISOString().split('T')[0];
  
  const newNotifications = [];
  
  // Verificar meta de receita atingida
  if (goal > 0 && balance >= goal) {
    const alreadyExists = notifications.some(n => 
      n.type === 'goal_reached' && n.monthKey === monthKey && n.read === false
    );
    if (!alreadyExists) {
      newNotifications.push({
        id: Date.now(),
        type: 'goal_reached',
        title: '🎯 Meta Atingida!',
        message: `Parabéns! Atingiu a meta de ${formatCurrency(goal)} este mês.`,
        date: today,
        read: false,
        monthKey
      });
    }
  }
  
  // Verificar despesas altas (mais de 50% das receitas)
  if (income > 0 && (expenses / income) > 0.5) {
    const alreadyExists = notifications.some(n => 
      n.type === 'high_expenses' && n.monthKey === monthKey && n.read === false
    );
    if (!alreadyExists && expenses > 200) {
      newNotifications.push({
        id: Date.now(),
        type: 'high_expenses',
        title: '⚠️ Despesas Elevadas',
        message: `As despesas representam ${Math.round((expenses / income) * 100)}% das receitas.`,
        date: today,
        read: false,
        monthKey
      });
    }
  }
  
  // Verificar saldo negativo
  if (balance < 0) {
    const alreadyExists = notifications.some(n => 
      n.type === 'negative_balance' && n.monthKey === monthKey && n.read === false
    );
    if (!alreadyExists) {
      newNotifications.push({
        id: Date.now(),
        type: 'negative_balance',
        title: '💸 Saldo Negativo',
        message: `Atenção! O saldo deste mês está negativo (${formatCurrency(balance)}).`,
        date: today,
        read: false,
        monthKey
      });
    }
  }
  
  // Primeira receita registrada
  if (income > 0) {
    const alreadyExists = notifications.some(n => 
      n.type === 'first_income' && n.read === false
    );
    if (!alreadyExists) {
      newNotifications.push({
        id: Date.now(),
        type: 'first_income',
        title: '💰 Primeira Receita!',
        message: `Receita de ${formatCurrency(income)} registrada. Bem-vindo!`,
        date: today,
        read: false,
        monthKey
      });
    }
  }
  
  // Adicionar novas notificações
  if (newNotifications.length > 0) {
    notifications = [...notifications, ...newNotifications];
    saveNotifications();
  }
}

/**
 * Guardar notificações no localStorage
 */
function saveNotifications() {
  // Manter apenas últimas 10 notificações
  if (notifications.length > 10) {
    notifications = notifications.slice(-10);
  }
  localStorage.setItem('moneynest_notifications', JSON.stringify(notifications));
}

/**
 * Renderizar notificação na UI
 */
function renderNotifications() {
  const container = document.querySelector('.notification');
  const badge = document.querySelector('.notification-badge');
  
  if (!container) return;
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Atualizar badge
  if (badge) {
    badge.textContent = unreadCount > 0 ? `🔔(${unreadCount})` : '💬';
  }
  
  // Mostrar última notificação ou mensagem padrão
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
    container.textContent = 'Sem notificações no momento.';
  }
  
  // Atualizar contador no header se existir
  updateNotificationCount();
}

/**
 * Atualizar contador de notificações não lidas
 */
function updateNotificationCount() {
  const unreadCount = notifications.filter(n => !n.read).length;
  const badge = document.querySelector('.notification-badge');
  if (badge) {
    badge.textContent = unreadCount > 0 ? `🔔(${unreadCount})` : '💬';
  }
}

/**
 * Marcar notificação como lida
 */
function markNotificationRead(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.read = true;
    saveNotifications();
    renderNotifications();
  }
}

/**
 * Marcar todas como lidas
 */
function markAllNotificationsRead() {
  notifications.forEach(n => n.read = true);
  saveNotifications();
  renderNotifications();
}

/**
 * Eliminar todas as notificações
 */
function clearAllNotifications() {
  notifications = [];
  saveNotifications();
  renderNotifications();
}

/**
 * Criar notificação manual (para testar)
 */
function createNotification(title, message, type = 'info') {
  const today = new Date().toISOString().split('T')[0];
  notifications.push({
    id: Date.now(),
    type,
    title,
    message,
    date: today,
    read: false,
    monthKey: `${selectedYear}-${selectedMonth}`
  });
  saveNotifications();
  renderNotifications();
}
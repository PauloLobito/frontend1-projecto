/**
 * ================================================
 * MONEY NEST - ARQUIVO DE AUTENTICAÇÃO
 * ================================================
 * Este ficheiro contém todas as funções relacionadas
 * com o login e registo de utilizadores.
 * 
 * Funcionalidades:
 * - Toggle de visibilidade da palavra-passe
 * - Validação de formulários
 * - Indicador de força da palavra-passe
 * - Mensagens de sucesso/erro
 * - Guardar/verificar utilizadores no localStorage
 */

// ================================================
// FUNÇÃO: togglePassword
// ================================================
/**
 * Alterna a visibilidade da palavra-passe entre visível e oculta.
 * Quando clicada, muda o tipo do input de 'password' para 'text'
 * e vice-versa, permitindo ao utilizador ver ou esconder a palavra-passe.
 * 
 * @param {string} inputId - O ID do campo de input da palavra-passe
 * @param {HTMLElement} btn - O botão que foi clicado (para mudar o ícone)
 */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<span>🙈</span>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<span>👁</span>';
  }
}

// ================================================
// FUNÇÃO: showMessage
// ================================================
/**
 * Exibe uma mensagem de feedback para o utilizador.
 * Pode ser uma mensagem de sucesso (verde) ou erro (vermelho).
 * A mensagem aparece no topo do formulário e desaparece
 * automaticamente após 5 segundos.
 * 
 * @param {string} type - Tipo de mensagem: 'success' ou 'error'
 * @param {string} text - Texto da mensagem a exibir
 */
function showMessage(type, text) {
  const container = document.getElementById('message-container');
  if (!container) return;
  container.innerHTML = `<div class="message ${type}">${text}</div>`;
  setTimeout(() => container.innerHTML = '', 5000);
}

// ================================================
// FUNÇÃO: checkPasswordStrength
// ================================================
/**
 * Analisa a força da palavra-passe digitada e atualiza a barra
 * de progresso visualmente.
 * 
 * A força é calculada com base em 4 critérios:
 * 1. Mínimo 8 caracteres
 * 2. Contém pelo menos uma letra maiúscula
 * 3. Contém pelo menos um número
 * 4. Contém pelo menos um caractere especial
 * 
 * @param {string} password - A palavra-passe a ser analisada
 */
function checkPasswordStrength(password) {
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  
  if (!strengthFill || !strengthText) return;
  
  strengthFill.className = 'strength-fill';
  strengthText.className = 'strength-text';
  
  if (!password) {
    strengthText.textContent = 'Digite uma palavra-passe';
    return;
  }

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = ['weak', 'fair', 'good', 'strong'];
  const texts = ['Fraca', 'Razoável', 'Boa', 'Forte'];
  
  strengthFill.classList.add(levels[strength - 1] || 'weak');
  strengthText.classList.add(levels[strength - 1] || 'weak');
  strengthText.textContent = texts[strength - 1] || 'Muito fraca';
}

// ================================================
// FUNÇÃO: getUsers
// ================================================
/**
 * Obtém a lista de utilizadores guardados no localStorage.
 * Se não existirem utilizadores, retorna a lista vazia.
 * 
 * @returns {Array} Array de objetos {email, password, firstName, lastName}
 */
function getUsers() {
  const users = localStorage.getItem('moneynest_users');
  return users ? JSON.parse(users) : [];
}

// ================================================
// FUNÇÃO: saveUser
// ================================================
/**
 * Guarda um novo utilizador no localStorage.
 * 
 * @param {Object} user - Objeto com email, password, firstName, lastName
 * @returns {boolean} True se guardado com sucesso, false se email já existe
 */
function saveUser(user) {
  const users = getUsers();
  
  // Verifica se o email já existe
  if (users.find(u => u.email === user.email)) {
    return false;
  }
  
  users.push(user);
  localStorage.setItem('moneynest_users', JSON.stringify(users));
  return true;
}

// ================================================
// FUNÇÃO: findUser
// ================================================
/**
 * Procura um utilizador pelo email e palavra-passe.
 * 
 * @param {string} email - Email do utilizador
 * @param {string} password - Palavra-passe do utilizador
 * @returns {Object|null} O utilizador se encontrado, null caso contrário
 */
function findUser(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

// ================================================
// EVENTO: DOMContentLoaded
// ================================================
/**
 * Quando a página carrega completamente, este código
 * configura os formulários de login e registo.
 */
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // CONFIGURAÇÃO DO FORMULÁRIO DE LOGIN
  // ========================================
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('login-btn');
      btn.classList.add('loading');
      btn.textContent = '';

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Simula um atraso de rede
      await new Promise(r => setTimeout(r, 1500));

      btn.classList.remove('loading');
      btn.textContent = 'Iniciar Sessão';

      // Verifica primeiro se é o utilizador demo
      if (email === 'demo@moneynest.com' && password === 'demo123') {
        showMessage('success', '✓ Sessão iniciada com sucesso! A redirecionar...');
        localStorage.setItem('moneynest_loggedIn', JSON.stringify({
          email: 'demo@moneynest.com',
          firstName: 'Demo',
          lastName: 'User'
        }));
        setTimeout(() => window.location.href = 'index.html', 1500);
      } 
      // Depois verifica nos utilizadores registados
      else {
        const user = findUser(email, password);
        if (user) {
          showMessage('success', '✓ Sessão iniciada com sucesso! A redirecionar...');
          localStorage.setItem('moneynest_loggedIn', JSON.stringify(user));
          setTimeout(() => window.location.href = 'index.html', 1500);
        } else {
          showMessage('error', '✗ Email ou palavra-passe incorretos');
        }
      }
    });
  }

  // ========================================
  // CONFIGURAÇÃO DO FORMULÁRIO DE REGISTO
  // ========================================
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('input', function(e) {
        checkPasswordStrength(e.target.value);
      });
    }

    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;

      if (password !== confirmPassword) {
        showMessage('error', '✗ As palavras-passe não coincidem');
        return;
      }

      if (!terms) {
        showMessage('error', '✗ Tem de aceitar os termos para continuar');
        return;
      }

      const btn = document.getElementById('register-btn');
      btn.classList.add('loading');
      btn.textContent = '';

      await new Promise(r => setTimeout(r, 2000));

      btn.classList.remove('loading');
      btn.textContent = 'Criar Conta';

      // Tenta guardar o utilizador
      const saved = saveUser({ email, password, firstName, lastName });
      
      if (saved) {
        showMessage('success', '✓ Conta criada com sucesso! A redirecionar...');
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        showMessage('error', '✗ Este email já está registado');
      }
    });
  }
});

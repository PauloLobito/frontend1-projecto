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
 * 
 * Como funciona:
 * 1. Pega o input pelo ID
 * 2. Se estiver oculto (password), mostra (text)
 * 3. Se estiver visível, oculta
 * 4. Muda o ícone entre 👁 (olho) e 🙈 (macaco)
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
 * 
 * Como funciona:
 * 1. Procura o container de mensagens na página
 * 2. Insere o HTML da mensagem com a classe correta
 * 3. Configura um timer para remover a mensagem após 5 segundos
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
 * Níveis de força:
 * - 1 critério = Fraca (vermelho)
 * - 2 critérios = Razoável (laranja)
 * - 3 critérios = Boa (verde)
 * - 4 critérios = Forte (cyan)
 * 
 * @param {string} password - A palavra-passe a ser analisada
 * 
 * @example
 * checkPasswordStrength('abc');        // Fraca (só 3 caracteres)
 * checkPasswordStrength('Abc12345');   // Boa (8 chars + maiúscula + número)
 * checkPasswordStrength('Abc12345!');  // Forte (todos os critérios)
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
// EVENTO: DOMContentLoaded
// ================================================
/**
 * Quando a página carrega completamente, este código
 * configura os formulários de login e registo.
 * 
 * O evento DOMContentLoaded garante que o código só
 * executa quando todo o HTML já foi carregado.
 */
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // CONFIGURAÇÃO DO FORMULÁRIO DE LOGIN
  // ========================================
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    /**
     * Quando o utilizador clica em "Iniciar Sessão" (submit):
     * 1. Previne o comportamento padrão do formulário
     * 2. Mostra o estado de loading no botão
     * 3. Aguarda 1.5 segundos (simula chamada à API)
     * 4. Verifica as credenciais
     * 5. Mostra mensagem de sucesso ou erro
     */
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('login-btn');
      btn.classList.add('loading');
      btn.textContent = '';

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      await new Promise(r => setTimeout(r, 1500));

      btn.classList.remove('loading');
      btn.textContent = 'Iniciar Sessão';

      if (email === 'demo@moneynest.com' && password === 'demo123') {
        showMessage('success', '✓ Sessão iniciada com sucesso! A redirecionar...');
        setTimeout(() => window.location.href = '../pages/index.html', 1500);
      } else {
        showMessage('error', '✗ Email ou palavra-passe incorretos. Tente demo@moneynest.com / demo123');
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

    /**
     * Quando o utilizador clica em "Criar Conta" (submit):
     * 1. Valida se as palavras-passe coincidem
     * 2. Valida se os termos foram aceites
     * 3. Mostra estado de loading
     * 4. Simula criação de conta
     * 5. Redireciona para login
     */
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

      showMessage('success', '✓ Conta criada com sucesso! A redirecionar...');
      setTimeout(() => window.location.href = 'login.html', 1500);
    });
  }
});

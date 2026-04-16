/**
 * ================================================
 * MONEY NEST - ARQUIVO DE AUTENTICAÇÃO
 * ================================================
 * Este ficheiro contém todas as funções relacionadas
 * com o login e registo de utilizadores.
 * 
 * Funcionalidades:
 * - Toggle de visibilidade da senha
 * - Validação de formulários
 * - Indicador de força da senha
 * - Mensagens de sucesso/erro
 */

// ================================================
// FUNÇÃO: togglePassword
// ================================================
/**
 * Alterna a visibilidade da senha entre visível e oculta.
 * Quando clicada, muda o tipo do input de 'password' para 'text'
 * e vice-versa, permitindo ao utilizador ver ou esconder a senha.
 * 
 * @param {string} inputId - O ID do campo de input da senha
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
 * Analisa a força da senha digitada e atualiza a barra
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
 * @param {string} password - A senha a ser analisada
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
  
  // Reseta as classes de força
  strengthFill.className = 'strength-fill';
  strengthText.className = 'strength-text';
  
  // Se não houver senha, mostra texto inicial
  if (!password) {
    strengthText.textContent = 'Digite uma senha';
    return;
  }

  // Contador de critérios cumpridos
  let strength = 0;
  
  // Verifica se tem pelo menos 8 caracteres
  if (password.length >= 8) strength++;
  
  // Verifica se tem pelo menos uma letra maiúscula (A-Z)
  if (/[A-Z]/.test(password)) strength++;
  
  // Verifica se tem pelo menos um número (0-9)
  if (/[0-9]/.test(password)) strength++;
  
  // Verifica se tem pelo menos um caractere especial (!@#$%...)
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Mapeia o nível para as classes CSS correspondentes
  const levels = ['weak', 'fair', 'good', 'strong'];
  const texts = ['Fraca', 'Razoável', 'Boa', 'Forte'];
  
  // Aplica a classe de força (ou 'weak' se não cumprir nenhum)
  const level = levels[strength - 1] || 'weak';
  strengthFill.classList.add(level);
  strengthText.classList.add(level);
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
     * Quando o utilizador clica em "Entrar" (submit):
     * 1. Previne o comportamento padrão do formulário
     * 2. Mostra o estado de loading no botão
     * 3. Aguarda 1.5 segundos (simula chamada à API)
     * 4. Verifica as credenciais
     * 5. Mostra mensagem de sucesso ou erro
     */
    loginForm.addEventListener('submit', async function(e) {
      // Previne o recarregamento da página
      e.preventDefault();
      
      // Pega o botão e coloca em modo loading
      const btn = document.getElementById('login-btn');
      btn.classList.add('loading');
      btn.textContent = '';

      // Pega os valores dos campos
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Simula um atraso de rede (1.5 segundos)
      await new Promise(r => setTimeout(r, 1500));

      // Remove o estado de loading
      btn.classList.remove('loading');
      btn.textContent = 'Entrar';

      // Verifica as credenciais (demo: demo@moneynest.com / demo123)
      if (email === 'demo@moneynest.com' && password === 'demo123') {
        showMessage('success', '✓ Login realizado com sucesso! Redirecionando...');
        // Redireciona para o dashboard após 1.5 segundos
        setTimeout(() => window.location.href = '../pages/index.html', 1500);
      } else {
        showMessage('error', '✗ Email ou senha incorretos. Tente demo@moneynest.com / demo123');
      }
    });
  }

  // ========================================
  // CONFIGURAÇÃO DO FORMULÁRIO DE REGISTO
  // ========================================
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    // Liga o indicador de força da senha em tempo real
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      /**
       * Cada vez que o utilizador digita algo no campo senha,
       * a função checkPasswordStrength é chamada para atualizar
       * a barra visual de força.
       */
      passwordInput.addEventListener('input', function(e) {
        checkPasswordStrength(e.target.value);
      });
    }

    /**
     * Quando o utilizador clica em "Criar Conta" (submit):
     * 1. Valida se as senhas coincidem
     * 2. Valida se os termos foram aceites
     * 3. Mostra estado de loading
     * 4. Simula criação de conta
     * 5. Redireciona para login
     */
    registerForm.addEventListener('submit', async function(e) {
      // Previne o recarregamento da página
      e.preventDefault();
      
      // Pega todos os valores do formulário
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;

      // Validação: As senhas devem ser iguais
      if (password !== confirmPassword) {
        showMessage('error', '✗ As senhas não coincidem');
        return; // Para a execução aqui
      }

      // Validação: Deve aceitar os termos
      if (!terms) {
        showMessage('error', '✗ Você precisa aceitar os termos para continuar');
        return; // Para a execução aqui
      }

      // Mostra estado de loading
      const btn = document.getElementById('register-btn');
      btn.classList.add('loading');
      btn.textContent = '';

      // Simula o tempo de criação da conta
      await new Promise(r => setTimeout(r, 2000));

      // Remove o loading
      btn.classList.remove('loading');
      btn.textContent = 'Criar Conta';

      // Mostra sucesso e redireciona
      showMessage('success', '✓ Conta criada com sucesso! Redirecionando...');
      setTimeout(() => window.location.href = 'login.html', 1500);
    });
  }
});

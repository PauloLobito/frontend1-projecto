/**
 * ================================================
 * MONEY NEST - WEB COMPONENT
 * ================================================
 * Componente personalizado: <money-transaction-card>
 *
 * Atributos:
 *  - record-id       : ID único do registo
 *  - description     : Descrição da transação
 *  - value           : Valor numérico
 *  - date            : Data no formato YYYY-MM-DD
 *  - category        : Categoria (ex: "Alimentação")
 *  - type            : "income" ou "expense"
 *  - currency-symbol : Símbolo da moeda (ex: "R$")
 *
 * Eventos emitidos:
 *  - record-edit   : { detail: { id } }
 *  - record-delete : { detail: { id } }
 *
 * Exemplo de uso:
 *  <money-transaction-card
 *    record-id="123"
 *    description="Supermercado"
 *    value="45.50"
 *    date="2026-04-30"
 *    category="Alimentação"
 *    type="expense"
 *    currency-symbol="R$">
 *  </money-transaction-card>
 */

class MoneyTransactionCard extends HTMLElement {

  // ── Atributos observados (reatividade) ──────────────────────────────────
  // Quando qualquer um destes atributos mudar no HTML, o componente re-renderiza.
  static get observedAttributes() {
    return ['record-id', 'description', 'value', 'date', 'category', 'type', 'currency-symbol'];
  }

  constructor() {
    super(); // Sempre obrigatório em Web Components

    // Shadow DOM: cria um "DOM privado" isolado do resto da página.
    // O CSS aqui dentro não afeta o exterior, e o CSS exterior não afeta aqui dentro.
    this.attachShadow({ mode: 'open' });
  }

  // ── Ciclo de vida: elemento inserido no DOM ──────────────────────────────
  connectedCallback() {
    this.render();
  }

  // ── Ciclo de vida: atributo alterado ────────────────────────────────────
  // Chamado automaticamente quando um atributo de observedAttributes muda.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

  // ── Leitura de atributos ─────────────────────────────────────────────────
  get recordId()        { return this.getAttribute('record-id'); }
  get description()     { return this.getAttribute('description') || ''; }
  get value()           { return parseFloat(this.getAttribute('value')) || 0; }
  get date()            { return this.getAttribute('date') || ''; }
  get category()        { return this.getAttribute('category') || ''; }
  get type()            { return this.getAttribute('type') || 'expense'; }
  get currencySymbol()  { return this.getAttribute('currency-symbol') || 'R$'; }

  // ── Formatação de data ───────────────────────────────────────────────────
  formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  // ── Formatação de valor ──────────────────────────────────────────────────
  formatValue(val) {
    return val.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ── Emissão de eventos customizados ─────────────────────────────────────
  // Quando o utilizador clica em "Editar", o componente emite um evento
  // que o dashboard.js pode escutar sem que o componente precise de saber
  // como o modal funciona — separação de responsabilidades.
  emitEdit() {
    this.dispatchEvent(new CustomEvent('record-edit', {
      bubbles: true,       // o evento sobe pelo DOM
      composed: true,      // atravessa a barreira do Shadow DOM
      detail: { id: this.recordId }
    }));
  }

  emitDelete() {
    this.dispatchEvent(new CustomEvent('record-delete', {
      bubbles: true,
      composed: true,
      detail: { id: this.recordId }
    }));
  }

  // ── Renderização ─────────────────────────────────────────────────────────
  // Aqui construímos o HTML e CSS do componente dentro do Shadow DOM.
  render() {
    const isIncome  = this.type === 'income';
    const sign      = isIncome ? '+' : '-';
    const typeClass = isIncome ? 'income' : 'expense';
    const typeLabel = isIncome ? 'Receita' : 'Despesa';

    // Estilos encapsulados: só existem dentro deste componente
    const styles = `
      :host {
        display: block;
      }

      .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px;
        background: var(--panel, #141f4f);
        border-radius: 14px;
        border-left: 4px solid var(--accent);
        margin-bottom: 10px;
        font-family: 'Inter', sans-serif;
        color: var(--text, #f4f7ff);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .card:hover {
        transform: translateX(3px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      }

      .card.income  { --accent: #23e0a1; }
      .card.expense { --accent: #ff5b72; }

      .info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }

      .description {
        font-weight: 600;
        font-size: 0.95rem;
        color: var(--text, #f4f7ff);
      }

      .meta {
        display: flex;
        gap: 10px;
        font-size: 0.78rem;
        color: var(--muted, #95a0cf);
      }

      .badge {
        background: rgba(255,255,255,0.08);
        padding: 2px 8px;
        border-radius: 20px;
        font-size: 0.72rem;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .value {
        font-weight: 700;
        font-size: 1rem;
      }

      .card.income  .value { color: #23e0a1; }
      .card.expense .value { color: #ff5b72; }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        padding: 4px;
        border-radius: 6px;
        transition: background 0.15s;
      }

      button:hover {
        background: rgba(255,255,255,0.1);
      }

      .type-label {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .card.income  .type-label { background: rgba(35,224,161,0.15); color: #23e0a1; }
      .card.expense .type-label { background: rgba(255,91,114,0.15);  color: #ff5b72; }
    `;

    // HTML interno do componente
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="card ${typeClass}">
        <div class="info">
          <span class="description">${this.description}</span>
          <div class="meta">
            <span class="badge">${this.category}</span>
            <span>${this.formatDate(this.date)}</span>
            <span class="type-label">${typeLabel}</span>
          </div>
        </div>
        <div class="actions">
          <span class="value">${sign}${this.currencySymbol} ${this.formatValue(this.value)}</span>
          <button class="btn-edit"   title="Editar">✏️</button>
          <button class="btn-delete" title="Eliminar">🗑️</button>
        </div>
      </div>
    `;

    // Adicionar listeners após renderizar
    // Nota: usamos arrow functions para preservar o contexto (this)
    this.shadowRoot.querySelector('.btn-edit').addEventListener('click', () => this.emitEdit());
    this.shadowRoot.querySelector('.btn-delete').addEventListener('click', () => this.emitDelete());
  }
}

// ── Registo do elemento personalizado ───────────────────────────────────────
// Depois disto, o browser reconhece <money-transaction-card> como um elemento válido.
// O nome DEVE ter um hífen (requisito da especificação de Custom Elements).
customElements.define('money-transaction-card', MoneyTransactionCard);

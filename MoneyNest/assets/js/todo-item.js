class TodoItem extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'due-date', 'priority', 'completed'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    attributeChangedCallback() {
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        if (!this.shadowRoot) return;

        const editBtn = this.shadowRoot.querySelector('.todo-btn-edit');
        const deleteBtn = this.shadowRoot.querySelector('.todo-btn-delete');
        const toggle = this.shadowRoot.querySelector('.todo-check');

        if (editBtn) {
            editBtn.onclick = () => {
                this.dispatchEvent(new CustomEvent('edit-todo', {
                    bubbles: true,
                    composed: true,
                    detail: { id: Number(this.dataset.id) }
                }));
            };
        }

        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.dispatchEvent(new CustomEvent('delete-todo', {
                    bubbles: true,
                    composed: true,
                    detail: { id: Number(this.dataset.id) }
                }));
            };
        }

        if (toggle) {
            toggle.onchange = (event) => {
                this.dispatchEvent(new CustomEvent('toggle-todo', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        id: Number(this.dataset.id),
                        completed: event.target.checked
                    }
                }));
            };
        }
    }

    render() {
        if (!this.shadowRoot) return;

        const title = this.getAttribute('title') || '';
        const dueDate = this.getAttribute('due-date') || '';
        const priority = this.getAttribute('priority') || 'medium';
        const completed = this.getAttribute('completed') === 'true';

        const priorityMap = {
            low: 'Baixa',
            medium: 'Media',
            high: 'Alta'
        };

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px;
        }

        .todo-check {
          width: 18px;
          height: 18px;
          accent-color: #23e0a1;
          cursor: pointer;
          flex-shrink: 0;
        }

        .todo-content {
          flex: 1;
          min-width: 0;
        }

        .todo-title {
          margin: 0;
          color: #f4f7ff;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.3;
          word-break: break-word;
        }

        .todo-title.completed {
          text-decoration: line-through;
          opacity: 0.65;
        }

        .todo-meta {
          margin-top: 4px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 12px;
          color: #95a0cf;
        }

        .todo-priority {
          border-radius: 999px;
          padding: 2px 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .todo-priority.low {
          color: #23e0a1;
        }

        .todo-priority.medium {
          color: #18d2eb;
        }

        .todo-priority.high {
          color: #ff8a2a;
        }

        .todo-actions {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        button {
          border: 0;
          border-radius: 8px;
          padding: 8px 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }

        .todo-btn-edit {
          background: rgba(24, 210, 235, 0.18);
          color: #18d2eb;
        }

        .todo-btn-delete {
          background: rgba(255, 91, 114, 0.2);
          color: #ff5b72;
        }
      </style>

      <div class="todo-item">
        <input class="todo-check" type="checkbox" ${completed ? 'checked' : ''} aria-label="Marcar TODO" />
        <div class="todo-content">
          <p class="todo-title ${completed ? 'completed' : ''}">${title}</p>
          <div class="todo-meta">
            <span>Prazo: ${dueDate || 'Sem data'}</span>
            <span class="todo-priority ${priority}">${priorityMap[priority] || 'Media'}</span>
          </div>
        </div>
        <div class="todo-actions">
          <button class="todo-btn-edit" type="button">Editar</button>
          <button class="todo-btn-delete" type="button">Apagar</button>
        </div>
      </div>
    `;
    }
}

customElements.define('todo-item', TodoItem);

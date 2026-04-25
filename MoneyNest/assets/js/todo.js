let todos = [];
let editingTodoId = null;

function todoHasSwal() {
    return typeof Swal !== 'undefined';
}

function todoAlert(config) {
    if (todoHasSwal()) {
        return Swal.fire(config);
    }

    alert(config.title || config.text || 'Operacao concluida.');
    return Promise.resolve();
}

function todoConfirm(config) {
    if (todoHasSwal()) {
        return Swal.fire(config).then(result => result.isConfirmed);
    }

    return Promise.resolve(confirm(config.text || 'Tem certeza?'));
}

function validateTodoForm(title, dueDate) {
    const errors = [];

    if (!title || title.trim().length < 3) {
        errors.push('O titulo deve ter pelo menos 3 caracteres.');
    }

    if (!dueDate) {
        errors.push('A data limite e obrigatoria.');
    }

    return errors;
}

function setDefaultTodoDate() {
    const todoDueDate = document.getElementById('todoDueDate');
    const editTodoDueDate = document.getElementById('editTodoDueDate');
    const today = new Date().toISOString().split('T')[0];

    if (todoDueDate && !todoDueDate.value) {
        todoDueDate.value = today;
    }

    if (editTodoDueDate && !editTodoDueDate.value) {
        editTodoDueDate.value = today;
    }
}

async function loadTodos() {
    try {
        todos = await apiGetTodos();
        renderTodos();
        renderTodoCanvas();
    } catch (error) {
        console.error('[Todo] Error loading todos:', error);
        todoAlert({ icon: 'error', title: 'Erro', text: 'Nao foi possivel carregar os TODOs.' });
    }
}

async function createTodo(event) {
    if (event) event.preventDefault();

    const titleInput = document.getElementById('todoTitle');
    const dueDateInput = document.getElementById('todoDueDate');
    const priorityInput = document.getElementById('todoPriority');

    if (!titleInput || !dueDateInput || !priorityInput) return;

    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    const errors = validateTodoForm(title, dueDate);
    if (errors.length > 0) {
        todoAlert({ icon: 'warning', title: 'Validacao', text: errors.join(' ') });
        return;
    }

    const payload = {
        title,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {
        await apiCreateTodo(payload);
        titleInput.value = '';
        setDefaultTodoDate();
        await loadTodos();
        todoAlert({ icon: 'success', title: 'TODO criado!' });
    } catch (error) {
        console.error('[Todo] Error creating todo:', error);
        todoAlert({ icon: 'error', title: 'Erro', text: 'Nao foi possivel criar o TODO.' });
    }
}

function openEditTodoModal(id) {
    const todo = todos.find(item => item.id === id);
    if (!todo) return;

    editingTodoId = id;

    const modal = document.getElementById('todoEditModal');
    const titleInput = document.getElementById('editTodoTitle');
    const dueDateInput = document.getElementById('editTodoDueDate');
    const priorityInput = document.getElementById('editTodoPriority');

    if (!modal || !titleInput || !dueDateInput || !priorityInput) return;

    titleInput.value = todo.title;
    dueDateInput.value = todo.dueDate;
    priorityInput.value = todo.priority;
    modal.classList.add('active');
}

function closeEditTodoModal() {
    const modal = document.getElementById('todoEditModal');
    if (modal) modal.classList.remove('active');
    editingTodoId = null;
}

async function updateTodo(event) {
    if (event) event.preventDefault();
    if (!editingTodoId) return;

    const titleInput = document.getElementById('editTodoTitle');
    const dueDateInput = document.getElementById('editTodoDueDate');
    const priorityInput = document.getElementById('editTodoPriority');

    if (!titleInput || !dueDateInput || !priorityInput) return;

    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    const errors = validateTodoForm(title, dueDate);
    if (errors.length > 0) {
        todoAlert({ icon: 'warning', title: 'Validacao', text: errors.join(' ') });
        return;
    }

    try {
        await apiUpdateTodo(editingTodoId, {
            title,
            dueDate,
            priority,
            updatedAt: new Date().toISOString()
        });

        closeEditTodoModal();
        await loadTodos();
        todoAlert({ icon: 'success', title: 'TODO atualizado!' });
    } catch (error) {
        console.error('[Todo] Error updating todo:', error);
        todoAlert({ icon: 'error', title: 'Erro', text: 'Nao foi possivel atualizar o TODO.' });
    }
}

async function removeTodo(id) {
    const confirmed = await todoConfirm({
        icon: 'warning',
        title: 'Apagar TODO?',
        text: 'Esta acao nao pode ser revertida.',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        reverseButtons: true
    });

    if (!confirmed) return;

    try {
        await apiDeleteTodo(id);
        await loadTodos();
        todoAlert({ icon: 'success', title: 'TODO removido!' });
    } catch (error) {
        console.error('[Todo] Error deleting todo:', error);
        todoAlert({ icon: 'error', title: 'Erro', text: 'Nao foi possivel apagar o TODO.' });
    }
}

async function toggleTodo(id, completed) {
    const todo = todos.find(item => item.id === id);
    if (!todo) return;

    try {
        await apiUpdateTodo(id, {
            ...todo,
            completed,
            updatedAt: new Date().toISOString()
        });
        await loadTodos();
    } catch (error) {
        console.error('[Todo] Error toggling todo:', error);
        todoAlert({ icon: 'error', title: 'Erro', text: 'Nao foi possivel atualizar o estado do TODO.' });
    }
}

function renderTodos() {
    const list = document.getElementById('todoList');
    const count = document.getElementById('todoCount');
    if (!list) return;

    list.innerHTML = '';

    if (count) {
        const completed = todos.filter(t => t.completed).length;
        count.textContent = `${completed}/${todos.length} concluidos`;
    }

    if (todos.length === 0) {
        list.innerHTML = '<p class="todo-empty">Sem TODOs. Crie o primeiro item.</p>';
        return;
    }

    const sortedTodos = [...todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    sortedTodos.forEach(todo => {
        const item = document.createElement('todo-item');
        item.dataset.id = String(todo.id);
        item.setAttribute('title', todo.title);
        item.setAttribute('due-date', todo.dueDate);
        item.setAttribute('priority', todo.priority || 'medium');
        item.setAttribute('completed', String(Boolean(todo.completed)));

        item.addEventListener('edit-todo', (event) => openEditTodoModal(event.detail.id));
        item.addEventListener('delete-todo', (event) => removeTodo(event.detail.id));
        item.addEventListener('toggle-todo', (event) => toggleTodo(event.detail.id, event.detail.completed));

        list.appendChild(item);
    });
}

function renderTodoCanvas() {
    const canvas = document.getElementById('todoStatusCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const completed = todos.filter(t => t.completed).length;
    const pending = Math.max(todos.length - completed, 0);

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const total = completed + pending;
    const completedRatio = total > 0 ? completed / total : 0;

    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#23e0a1';
    ctx.fillRect(0, 0, width * completedRatio, height);

    ctx.fillStyle = '#f4f7ff';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Concluidos: ${completed}`, 8, 16);
    ctx.fillText(`Pendentes: ${pending}`, 8, 32);
}

function bindTodoEvents() {
    const todoForm = document.getElementById('todoForm');
    const editTodoForm = document.getElementById('editTodoForm');
    const modal = document.getElementById('todoEditModal');

    if (todoForm) {
        todoForm.addEventListener('submit', createTodo);
    }

    if (editTodoForm) {
        editTodoForm.addEventListener('submit', updateTodo);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeEditTodoModal();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeEditTodoModal();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setDefaultTodoDate();
    bindTodoEvents();
    loadTodos();
});

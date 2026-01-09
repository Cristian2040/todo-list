document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const dateDisplay = document.getElementById('date-display');

    // State
    let todos = [];
    let currentFilter = 'all';

    // Initialization
    init();

    function init() {
        loadTodos();
        renderDate();
        renderTodos();
        setupEventListeners();
    }

    function setupEventListeners() {
        todoForm.addEventListener('submit', handleAddTodo);
        todoList.addEventListener('click', handleListClick);
        clearCompletedBtn.addEventListener('click', clearCompleted);
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update filter and render
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });
    }

    function renderDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateDisplay.textContent = today.toLocaleDateString('es-ES', options);
    }

    // Core Logic
    function handleAddTodo(e) {
        e.preventDefault();
        const text = todoInput.value.trim();
        
        if (text === '') return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }

    function handleListClick(e) {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        
        const id = Number(item.dataset.id);

        // Delete Button
        if (e.target.closest('.delete-btn')) {
            if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
                deleteTodo(id);
            }
            return;
        }

        // Checkbox (Toggle)
        if (e.target.classList.contains('todo-checkbox')) {
            toggleTodo(id);
        }
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodos();
        renderTodos();
    }

    function deleteTodo(id) {
        // Add fade out animation class before removing
        const item = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (item) {
            item.style.animation = 'fadeOut 0.3s ease forwards';
            item.addEventListener('animationend', () => {
                todos = todos.filter(todo => todo.id !== id);
                saveTodos();
                renderTodos();
            });
        } else {
            // Fallback if element not found (shouldn't happen)
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }
    }

    function clearCompleted() {
        if (confirm('¿Borrar todas las tareas completadas?')) {
            todos = todos.filter(todo => !todo.completed);
            saveTodos();
            renderTodos();
        }
    }

    // Storage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const stored = localStorage.getItem('todos');
        if (stored) {
            todos = JSON.parse(stored);
        }
    }

    // Rendering
    function renderTodos() {
        // Filter tasks
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        // Clear list
        todoList.innerHTML = '';

        // Empty state check
        if (filteredTodos.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }

        // Render items
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} aria-label="Marcar como completada">
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" aria-label="Eliminar tarea">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;
            
            todoList.appendChild(li);
        });

        updateStats();
    }

    function updateStats() {
        const activeCount = todos.filter(t => !t.completed).length;
        itemsLeft.textContent = `${activeCount} tarea${activeCount !== 1 ? 's' : ''} pendiente${activeCount !== 1 ? 's' : ''}`;
        
        const hasCompleted = todos.some(t => t.completed);
        if (hasCompleted) {
            clearCompletedBtn.classList.remove('hidden');
        } else {
            clearCompletedBtn.classList.add('hidden');
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

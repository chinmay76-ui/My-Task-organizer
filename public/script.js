$(document).ready(function () {
    let tasks = [];
    let currentFilter = 'all';

    // Initial load
    fetchTasks();

    // Fetch tasks from API
    function fetchTasks() {
        $.ajax({
            url: '/tasks',
            method: 'GET',
            success: function (data) {
                tasks = data;
                renderTasks();
            },
            error: function (err) {
                console.error('Error fetching tasks:', err);
            }
        });
    }

    // Add new task
    $('#todo-form').on('submit', function (e) {
        e.preventDefault();
        const taskText = $('#task-input').val();
        const priority = $('#priority-input').val();

        if (taskText.trim() === '') return;

        $.ajax({
            url: '/tasks',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ task: taskText, priority: priority }),
            success: function (newTask) {
                tasks.unshift(newTask);
                $('#task-input').val('');
                renderTasks();
            },
            error: function (err) {
                console.error('Error adding task:', err);
            }
        });
    });

    // Delete task
    $(document).on('click', '.delete-btn', function () {
        const taskId = $(this).closest('.task-item').data('id');

        $.ajax({
            url: `/tasks/${taskId}`,
            method: 'DELETE',
            success: function () {
                tasks = tasks.filter(t => t._id !== taskId);
                renderTasks();
            },
            error: function (err) {
                console.error('Error deleting task:', err);
            }
        });
    });

    // Edit task
    $(document).on('click', '.edit-btn', function () {
        const taskId = $(this).closest('.task-item').data('id');
        const currentTask = tasks.find(t => t._id === taskId);
        const newTaskText = prompt('Edit your task:', currentTask.task);

        if (newTaskText === null || newTaskText.trim() === '') return;

        $.ajax({
            url: `/tasks/${taskId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ task: newTaskText }),
            success: function (updatedTask) {
                tasks = tasks.map(t => t._id === taskId ? updatedTask : t);
                renderTasks();
            },
            error: function (err) {
                console.error('Error updating task:', err);
            }
        });
    });

    // Toggle completion
    $(document).on('click', '.check-btn', function () {
        const taskItem = $(this).closest('.task-item');
        const taskId = taskItem.data('id');
        const completed = !taskItem.hasClass('completed');

        $.ajax({
            url: `/tasks/${taskId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ completed: completed }),
            success: function (updatedTask) {
                tasks = tasks.map(t => t._id === taskId ? updatedTask : t);
                renderTasks();
            },
            error: function (err) {
                console.error('Error updating task:', err);
            }
        });
    });

    // Filtering logic
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        renderTasks();
    });

    // Render task list
    function renderTasks() {
        const $taskList = $('#task-list');
        $taskList.empty();

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'pending') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const taskHtml = `
                <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task._id}">
                    <button class="check-btn ${task.completed ? 'checked' : ''}"></button>
                    <div class="task-text">
                        <span class="priority-dot priority-${task.priority}"></span>
                        ${task.task}
                        <small class="ms-2 opacity-50" style="font-size: 0.7rem;">[${task.priority}]</small>
                    </div>
                    <div class="task-actions">
                        ${!task.completed ? `
                        <button class="edit-btn" aria-label="Edit task">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </button>` : ''}
                        <button class="delete-btn" aria-label="Delete task">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </li>
            `;
            $taskList.append(taskHtml);
        });

        // Update count
        const pendingCount = tasks.filter(t => !t.completed).length;
        $('#task-count').text(pendingCount);
    }
});

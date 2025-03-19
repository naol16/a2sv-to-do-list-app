
let tasks = [];

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add("task-item");
        li.innerHTML = `<input type="checkbox" class="task-checkbox" onclick="toggleDone(${index})" ${task.done ? "checked" : ""}>
                        <span class="task-text" ${task.done ? "style='text-decoration: line-through; color: gray;'" : ""}>${task.text}</span>
                        <input type="text" class="edit-input" style="display:none;" value="${task.text}" onblur="saveEdit(this, ${index})">
                        <div class="options-menu" style="display: none;">
                            <button class="edit-btn" onclick="toggleEdit(this, ${index})"> Edit</button>
                            <button class="delete-btn" onclick="deleteTask(${index})"> Delete</button>
                        </div>`;
        
        li.addEventListener("click", function(event) {
            if (!event.target.classList.contains("task-checkbox")) {
                let menu = li.querySelector(".options-menu");
                menu.style.display = menu.style.display === "none" ? "block" : "none";
            }
        });
        
        taskList.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;
    
    tasks.push({ text: taskText, done: false });
    input.value = "";
    renderTasks();
}

function toggleEdit(button, index) {
    let li = button.closest("li");
    let span = li.querySelector(".task-text");
    let input = li.querySelector(".edit-input");
    
    if (input.style.display === "none") {
        input.style.display = "inline-block";
        span.style.display = "none";
        input.focus();
    } else {
        input.style.display = "none";
        span.style.display = "inline";
    }
}

function saveEdit(input, index) {
    tasks[index].text = input.value.trim();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}


const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;
  const tasks = JSON.parse(saved);
  tasks.forEach(text => addTaskToDOM(text));
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li span").forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function handleAddTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  addTaskToDOM(text);
  taskInput.value = "";
  saveTasks();
}

addTaskButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddTask();
});

loadTasks();

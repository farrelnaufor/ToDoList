const taskInput = document.getElementById("task-input");
const timeInput = document.getElementById("time-input");
const addTaskBtn = document.getElementById("addtaskBtn");
const taskList = document.getElementById("taskList");
const popup = document.getElementById("popup");

// Popup function
function showPopup(message, type = "success") {
  popup.textContent = message;
  popup.className = `popup show ${type}`;
  setTimeout(() => popup.className = "popup", 2000);
}

// Load tasks from localStorage saat pertama kali buka
window.addEventListener("load", loadTasks);

// Tambah tugas
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText === "") return alert("Isi dulu tugasnya!");

  const task = { text: taskText, time: taskTime, completed: false };
  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
  timeInput.value = "";
  showPopup("SEMANGATT YAAA!!!");
});

// Tambahin ke DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("task-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  if (task.completed) li.classList.add("completed");

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateTask(task.text, "completed", checkbox.checked);
  });

  const span = document.createElement("span");
  span.textContent = task.time ? `${task.text} (${task.time})` : task.text;

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(task.text);
    showPopup("KERENNN UDAH SELESAII!!!");
  });

  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Simpan ke localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

// Update task (misal checklist)
function updateTask(text, key, value) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => task.text === text ? { ...task, [key]: value } : task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Hapus task
function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

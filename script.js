const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const addTaskBtn = document.getElementById("addtaskBtn");
const taskList = document.getElementById("TaskList");
const popup = document.getElementById("popup");

// Fungsi popup
function showPopup(message) {
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// Simpan data ke localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-content span").textContent,
      time: li.querySelector(".task-time")?.textContent.replace("⏰ ", "") || "",
      done: li.querySelector(".task-checkbox").checked
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load data dari localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => createTask(task.text, task.time, task.done));
}

.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 999;
}

.popup.show {
  opacity: 1;
  transform: translateY(0);
}

.popup.success {
  background: #10b981;
  color: white;
}

.popup.error {
  background: #ef4444;
  color: white;
}

// Buat elemen task baru
function createTask(text, time, done = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = done;

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const span = document.createElement("span");
  span.textContent = text;

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("task-time");
  if (time) timeSpan.textContent = `⏰ ${time}`;

  taskContent.appendChild(span);
  if (time) taskContent.appendChild(timeSpan);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#6b7280";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "#000";
    }
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.onclick = function () {
    taskList.removeChild(li);
    saveTasks();
    showPopup("KERENNN UDAH SELESAIII!!!!!");
  };

  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  if (done) {
    span.style.textDecoration = "line-through";
    span.style.color = "#6b7280";
  }

  saveTasks();
}

// Fungsi tambah task
function addTask() {
  const taskText = taskInput.value.trim();
  const timeValue = taskTime.value;

  if (taskText === "") {
    alert("Task tidak boleh kosong!");
    return;
  }

  createTask(taskText, timeValue, false);

  taskInput.value = "";
  taskTime.value = "";
  showPopup("SEMANGATT YAAA!!!!");
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

// Load data saat halaman dibuka
window.onload = loadTasks;


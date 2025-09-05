const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const addTaskBtn = document.getElementById("addtaskBtn");
const taskList = document.getElementById("TaskList");
const popup = document.getElementById("popup");

// Fungsi popup
function showPopup(message) {
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// Fungsi tambah task
function addTask() {
  const taskText = taskInput.value.trim();
  const timeValue = taskTime.value;

  if (taskText === "") {
    alert("GA BOLEH KOSONG!");
    return;
  }

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const span = document.createElement("span");
  span.textContent = taskText;

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("task-time");
  if (timeValue) {
    timeSpan.textContent = `⏰ ${timeValue}`;
  }

  taskContent.appendChild(span);
  if (timeValue) taskContent.appendChild(timeSpan);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#6b7280";
      if (timeValue) timeSpan.style.color = "#9ca3af";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "#000";
      if (timeValue) timeSpan.style.color = "#555";
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.onclick = function () {
    taskList.removeChild(li);
    showPopup("KERENNN UDAH SELESAII!!!!!");
  };

  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Reset input
  taskInput.value = "";
  taskTime.value = "";

  // Popup sukses
  showPopup("SEMANGATTT YAAAA!!!!!");
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

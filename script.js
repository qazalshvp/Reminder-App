const reminderInput = document.getElementById("reminderInput");
const addReminderButton = document.getElementById("addReminderButton");
const reminderList = document.getElementById("reminderList");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function displayReminders() {
  reminderList.innerHTML = "";
  reminders.forEach((reminder, index) => {
    const li = document.createElement("li");
    li.textContent = reminder.text;
    if (reminder.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = reminder.completed;
    checkbox.addEventListener("change", () => {
      reminder.completed = checkbox.checked;
      localStorage.setItem("reminders", JSON.stringify(reminders));
      displayReminders();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      reminders.splice(index, 1);
      localStorage.setItem("reminders", JSON.stringify(reminders));
      displayReminders();
    });

    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    reminderList.appendChild(li);
  });
}

addReminderButton.addEventListener("click", () => {
  const text = reminderInput.value.trim();
  if (text) {
    reminders.push({ text, completed: false });
    localStorage.setItem("reminders", JSON.stringify(reminders));
    reminderInput.value = "";
    displayReminders();
  } else {
    alert("Please enter a reminder.");
  }
});

displayReminders();

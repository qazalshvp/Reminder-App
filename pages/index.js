import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [reminders, setReminders] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dueDateValue, setDueDateValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("Low");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(storedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a reminder.");
      return;
    }

    const newReminder = {
      id: uuidv4(),
      text: inputValue,
      completed: false,
      dueDate: dueDateValue,
      priority: priorityValue,
    };

    setReminders([...reminders, newReminder]);
    setInputValue("");
    setDueDateValue("");
    setPriorityValue("Low");
  };

  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const editReminder = (id, newText) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, text: newText } : reminder
      )
    );
  };

  const filteredReminders = reminders.filter((reminder) =>
    reminder.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <h1 className={styles.title}>Reminder App</h1>
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <input
        type="text"
        placeholder="Search reminders"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your reminder"
          className={styles.inputField}
        />
        <input
          type="date"
          value={dueDateValue}
          onChange={(e) => setDueDateValue(e.target.value)}
          className={styles.dateInput}
        />
        <select
          value={priorityValue}
          onChange={(e) => setPriorityValue(e.target.value)}
          className={styles.prioritySelect}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addReminder} className={styles.addButton}>
          Add Reminder
        </button>
      </div>
      <ul className={styles.remindersList}>
        {filteredReminders.map((reminder) => (
          <li
            key={reminder.id}
            className={`${styles.reminderItem} ${
              reminder.completed ? styles.completed : ""
            }`}
          >
            <input
              type="checkbox"
              checked={reminder.completed}
              onChange={() => toggleReminder(reminder.id)}
              className={styles.checkbox}
            />
            <input
              type="text"
              value={reminder.text}
              onChange={(e) => editReminder(reminder.id, e.target.value)}
              className={styles.editInput}
            />
            {reminder.dueDate && (
              <span className={styles.dueDate}>Due: {reminder.dueDate}</span>
            )}
            <span className={styles.priority}>
              Priority: {reminder.priority}
            </span>
            <button
              onClick={() => deleteReminder(reminder.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

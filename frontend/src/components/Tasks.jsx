import React, { useState } from "react";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish frontend setup", completed: false, priority: "HIGH" },
    { id: 2, title: "Connect backend API", completed: false, priority: "MEDIUM" },
    { id: 3, title: "Test with dummy data", completed: true, priority: "LOW" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("LOW");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
      priority: newPriority,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Tasks</h2>

      {/* Add New Task */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </div>
  );
}

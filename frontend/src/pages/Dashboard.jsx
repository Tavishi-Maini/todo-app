import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Button, Typography, Box, TextField, Select, MenuItem, Card, Grid
} from "@mui/material";
import API from "../lib/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: ""
  });

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [sortOption, setSortOption] = useState("NONE");

  const fetchTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async () => {
    if (!newTask.title.trim()) return;
    await API.post("tasks/", newTask);
    setNewTask({ title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: "" });
    fetchTasks();
  };

  const handleToggle = async (task) => {
    const updatedStatus =
      task.status === "DONE" ? "TODO" : task.status === "TODO" ? "IN_PROGRESS" : "DONE";
    await API.patch(`tasks/${task.id}/`, { status: updatedStatus });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Apply filters
  const filteredTasks = tasks
    .filter(task => (filterStatus === "ALL" ? true : task.status === filterStatus))
    .filter(task => (filterPriority === "ALL" ? true : task.priority === filterPriority));

  // Apply sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "DUE_DATE") {
      return new Date(a.due_date || "2100-01-01") - new Date(b.due_date || "2100-01-01");
    }
    if (sortOption === "PRIORITY") {
      const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <Box sx={{ mt: 5, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>

      {/* Create Task Form */}
      <Card sx={{ mt: 3, p: 2 }}>
        <TextField
          fullWidth label="Title" value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })} sx={{ mt: 1 }}
        />
        <TextField
          fullWidth label="Description" value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })} sx={{ mt: 1 }}
        />
        <Select
          value={newTask.priority}
          onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
          sx={{ mt: 1, width: "100%" }}
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
        <Select
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          sx={{ mt: 1, width: "100%" }}
        >
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <TextField
          type="date" value={newTask.due_date}
          onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} sx={{ mt: 1, width: "100%" }}
        />
        <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleCreate}>
          Add Task
        </Button>
      </Card>

      {/* Filters & Sorting */}
      <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <MenuItem value="ALL">All Statuses</MenuItem>
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <Select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <MenuItem value="ALL">All Priorities</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
        <Select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <MenuItem value="NONE">No Sort</MenuItem>
          <MenuItem value="DUE_DATE">Sort by Due Date</MenuItem>
          <MenuItem value="PRIORITY">Sort by Priority</MenuItem>
        </Select>
      </Box>

      {/* Task List */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {sortedTasks.map(task => (
          <Grid item xs={12} key={task.id}>
            <TaskCard task={task} onToggle={() => handleToggle(task)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

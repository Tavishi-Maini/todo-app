import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Box, TextField, Select, MenuItem, Card, CardContent } from "@mui/material";
import API from "../lib/api";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: "" });

  const fetchTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async () => {
    await API.post("tasks/", newTask);
    setNewTask({ title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: "" });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>Logout</Button>

      {/* Create Task Form */}
      <Card sx={{ mt: 3, p: 2 }}>
        <TextField fullWidth label="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
        <TextField fullWidth label="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} sx={{ mt: 1 }} />
        <Select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} sx={{ mt: 1, width: "100%" }}>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
        <Select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })} sx={{ mt: 1, width: "100%" }}>
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <TextField type="date" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} sx={{ mt: 1, width: "100%" }} />
        <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleCreate}>Add Task</Button>
      </Card>

      {/* Task List */}
      {tasks.map(task => (
        <Card key={task.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography>{task.description}</Typography>
            <Typography>Priority: {task.priority} | Status: {task.status} | Due: {task.due_date}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

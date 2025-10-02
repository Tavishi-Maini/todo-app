import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Button, Typography, Box, TextField, Select, MenuItem, Card
} from "@mui/material";
import API from "../lib/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const [newTask, setNewTask] = useState({
    title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: "", assigned_to: ""
  });

  // Fetch tasks and teams
  const fetchTasks = async () => {
    let url = "tasks/";
    if (selectedTeam) url += `?team=${selectedTeam}`;
    const res = await API.get(url);
    setTasks(res.data);
  };

  const fetchTeams = async () => {
    const res = await API.get("teams/");
    setTeams(res.data);
  };

  useEffect(() => { fetchTasks(); fetchTeams(); }, [selectedTeam]);

  // Create new task
  const handleCreate = async () => {
    if (!newTask.title.trim()) return;
    if (selectedTeam) newTask.team = selectedTeam;
    await API.post("tasks/", newTask);
    setNewTask({ title: "", description: "", priority: "MEDIUM", status: "TODO", due_date: "", assigned_to: "" });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 900, mx: "auto", p: 2, bgcolor: "background.default", minHeight: "100vh" }}>
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h4" sx={{ fontWeight: 500 }}>Welcome, {user?.username}!</Typography>
    <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
  </Box>

  <Box sx={{ mt: 3 }}>
    <Select
      value={selectedTeam}
      onChange={e => setSelectedTeam(e.target.value)}
      displayEmpty
      fullWidth
      sx={{ bgcolor: "white", borderRadius: 1 }}
    >
      <MenuItem value="">All Teams</MenuItem>
      {teams.map(team => (
        <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
      ))}
    </Select>
  </Box>

  {/* Create Task Form */}
  <Card sx={{ mt: 3, p: 3, bgcolor: "white" }}>
    <TextField fullWidth label="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} sx={{ mt: 1 }} />
    <TextField fullWidth label="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} sx={{ mt: 2 }} />
    <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
      <Select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} sx={{ flex: 1 }}>
        <MenuItem value="LOW">Low</MenuItem>
        <MenuItem value="MEDIUM">Medium</MenuItem>
        <MenuItem value="HIGH">High</MenuItem>
      </Select>
      <Select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })} sx={{ flex: 1 }}>
        <MenuItem value="TODO">To Do</MenuItem>
        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
        <MenuItem value="DONE">Done</MenuItem>
      </Select>
    </Box>
    <TextField type="date" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} sx={{ mt: 2, width: "100%" }} />
    <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleCreate}>Add Task</Button>
  </Card>

  {/* Task List */}
  <Box sx={{ mt: 4 }}>
    {tasks.map(task => (
      <TaskCard key={task.id} task={task} />
    ))}
  </Box>
</Box>

  );
}

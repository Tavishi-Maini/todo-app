import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import API from "../lib/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks/");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // Fetch tasks by team
  const fetchTasksByTeam = async (teamId) => {
    try {
      if (!teamId) {
        fetchTasks();
        return;
      }
      const res = await API.get(`/api/teams/${teamId}/tasks/`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching team tasks", error);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/auth/users/"); // make sure this endpoint exists
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const res = await API.get("/api/teams/");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchTeams();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  // Update task (e.g., assign user)
  const handleUpdateTask = async (taskId, updates) => {
    try {
      await API.patch(`/api/tasks/${taskId}/assign/`, updates);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>

      {/* Team Filter */}
      <Select
        value={selectedTeam}
        onChange={(e) => {
          setSelectedTeam(e.target.value);
          fetchTasksByTeam(e.target.value);
        }}
        displayEmpty
        sx={{ mt: 2, width: "100%" }}
      >
        <MenuItem value="">All Teams</MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </Select>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Card sx={{ mt: 3, p: 2 }}>
          <CardContent>
            <Typography>No tasks yet. Add some tasks to get started!</Typography>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            users={users}
          />
        ))
      )}
    </Box>
  );
}

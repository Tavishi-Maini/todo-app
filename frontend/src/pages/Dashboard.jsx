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
import TaskCreationModal from "../components/TaskCreationModal";
import { subscribeTasks } from "../lib/socket";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // 🔹 Fetch tasks by team
  const fetchTasksByTeam = async (teamId) => {
    try {
      if (!teamId) {
        fetchTasks();
        return;
      }
      const res = await API.get(`teams/${teamId}/tasks/`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching team tasks", error);
    }
  };

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("users/");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // 🔹 Fetch teams
  const fetchTeams = async () => {
    try {
      const res = await API.get("teams/");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchTeams();

    // 🔹 WebSocket subscription for real-time updates
    subscribeTasks((data) => {
      if (!selectedTeam || data.task.team.id !== selectedTeam) return;

      if (data.action === "created") setTasks((prev) => [...prev, data.task]);
      if (data.action === "updated") {
        setTasks((prev) =>
          prev.map((t) => (t.id === data.task.id ? data.task : t))
        );
      }
    });
  }, [selectedTeam]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔹 Update task (status or assignment)
  const handleUpdateTask = async (taskId, updates) => {
    try {
      await API.patch(`tasks/${taskId}/assign/`, updates);
      fetchTasksByTeam(selectedTeam);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // 🔹 Create new team
  const handleCreateTeam = async () => {
    if (!newTeamName) return;
    try {
      await API.post("teams/", { name: newTeamName });
      setNewTeamName("");
      fetchTeams();
    } catch (error) {
      console.error("Error creating team", error);
    }
  };

  // 🔹 Add member to selected team
  const handleAddMember = async () => {
    if (!selectedTeam || !selectedUser) return;
    try {
      await API.post(`teams/${selectedTeam}/add_member/`, { user_id: selectedUser });
      setSelectedUser("");
      fetchTeams();
    } catch (error) {
      console.error("Error adding member", error);
    }
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 900, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Welcome, {user?.username}!</Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>

      {/* 🔹 Team filter */}
      <Select
        value={selectedTeam}
        onChange={(e) => {
          setSelectedTeam(e.target.value);
          fetchTasksByTeam(e.target.value);
        }}
        displayEmpty
        sx={{ mt: 1, mb: 2, width: 200 }}
      >
        <MenuItem value="">All Teams</MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
        ))}
      </Select>

      {/* 🔹 Team creation */}
      <Card sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6">Create New Team</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <input
            type="text"
            placeholder="Team Name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <Button variant="contained" onClick={handleCreateTeam}>Create Team</Button>
        </Box>
      </Card>

      {/* 🔹 Add member to team */}
      {selectedTeam && (
        <Card sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6">Add Member to Team</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1, alignItems: "center" }}>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">Select User</MenuItem>
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
          </Box>
        </Card>
      )}

      {/* 🔹 Create task button */}
      {selectedTeam && (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setIsModalOpen(true)}
        >
          + Create Task
        </Button>
      )}

      {/* 🔹 Task Creation Modal */}
      <TaskCreationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamId={selectedTeam}
        onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
      />

      {/* 🔹 Task list */}
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
            isManager={user?.id === task.team?.manager_id}
          />
        ))
      )}
    </Box>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import API from "../lib/api";

export default function TaskCreationModal({ open, onClose, teamId, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    if (!title) return;

    try {
      const res = await API.post(`teams/${teamId}/tasks/`, {
        title,
        description,
        priority,
        status,
        due_date: dueDate,
      });

      onTaskCreated(res.data); // notify Dashboard
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("TODO");
      setDueDate("");
      onClose();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task for Team</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ mt: 1, width: "100%" }}
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mt: 1, width: "100%" }}
        >
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <TextField
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ mt: 1, width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCreateTask}>
          Create Task
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

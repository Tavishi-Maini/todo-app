import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

export default function TaskCard({ task, onUpdate, users }) {
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to || "");

  const handleSave = () => {
    onUpdate(task.id, { status, assigned_to: assignedTo || null });
  };

  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography sx={{ mt: 1 }}>
          Priority: <b>{task.priority}</b> | Due:{" "}
          {task.due_date ? task.due_date : "No date"}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {/* Status Dropdown */}
          <Select value={status} onChange={(e) => setStatus(e.target.value)} size="small">
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>

          {/* Assigned User Dropdown */}
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Unassigned</MenuItem>
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.username}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" size="small" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}


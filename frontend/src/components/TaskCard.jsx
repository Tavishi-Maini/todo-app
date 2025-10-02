import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Select, MenuItem } from "@mui/material";

export default function TaskCard({ task, onUpdate, users, isManager }) {
  const [highlight, setHighlight] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [assignedUser, setAssignedUser] = useState(task.assigned_user?.id || "");

  // 🔹 Trigger highlight animation on mount or status change
  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 1500);
    return () => clearTimeout(timer);
  }, [task.id, task.status]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdate(task.id, { status: newStatus });
  };

  const handleAssignUser = (e) => {
    const userId = e.target.value;
    setAssignedUser(userId);
    onUpdate(task.id, { assigned_user: userId });
  };

  // 🔹 Background color based on highlight or status
  const bgColor = highlight
    ? "#e0f7fa"
    : status === "DONE"
    ? "#dcedc8"
    : status === "IN_PROGRESS"
    ? "#fff9c4"
    : "#ffffff";

  return (
    <Card sx={{ mt: 2, p: 2, backgroundColor: bgColor, transition: "background-color 0.5s" }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography sx={{ mb: 1 }}>{task.description}</Typography>
        <Typography sx={{ mb: 1 }}>
          Priority: {task.priority} | Status:{" "}
          <Select
            value={status}
            onChange={handleStatusChange}
            disabled={!isManager}
            size="small"
          >
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
        </Typography>

        {isManager && (
          <Typography>
            Assigned to:{" "}
            <Select
              value={assignedUser}
              onChange={handleAssignUser}
              size="small"
            >
              <MenuItem value="">Unassigned</MenuItem>
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.username}
                </MenuItem>
              ))}
            </Select>
          </Typography>
        )}

        <Typography sx={{ mt: 1, fontSize: "0.85rem", color: "#555" }}>
          Due: {task.due_date || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}

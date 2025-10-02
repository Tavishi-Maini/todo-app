import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

export default function TaskCard({ task }) {
  const statusColors = {
    TODO: "default",
    IN_PROGRESS: "primary",
    DONE: "success",
  };

  const priorityColors = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "error",
  };

  return (
    <Card sx={{ mt: 2, borderRadius: 2, boxShadow: 3, transition: "transform 0.2s", "&:hover": { transform: "scale(1.02)" } }}>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 500 }}>{task.title}</Typography>
    <Typography sx={{ mt: 1, color: "text.secondary" }}>{task.description}</Typography>
    <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
      <Chip label={`Priority: ${task.priority}`} color={priorityColors[task.priority]} size="small" />
      <Chip label={`Status: ${task.status}`} color={statusColors[task.status]} size="small" />
      {task.assigned_to && <Chip label={`Assigned: ${task.assigned_to.username}`} size="small" />}
      {task.due_date && <Chip label={`Due: ${task.due_date}`} size="small" />}
    </Box>
  </CardContent>
</Card>

  );
}

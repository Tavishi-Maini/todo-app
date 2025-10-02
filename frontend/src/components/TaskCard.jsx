import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function TaskCard({ task, onToggle }) {
  const priorityColor = { HIGH: "red", MEDIUM: "orange", LOW: "green" };
  const statusColor = { TODO: "gray", IN_PROGRESS: "blue", DONE: "green" };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== "DONE";

  return (
    <Card
      sx={{
        mt: 2,
        p: 2,
        borderLeft: `6px solid ${priorityColor[task.priority]}`,
        backgroundColor: task.status === "DONE" ? "#f0f0f0" : isOverdue ? "#ffe5e5" : "white",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textDecoration: task.status === "DONE" ? "line-through" : "none" }}
        >
          {task.title}
        </Typography>
        <Typography sx={{ mt: 0.5 }}>{task.description}</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography component="span" sx={{ color: priorityColor[task.priority], mr: 2 }}>
            Priority: {task.priority}
          </Typography>
          <Typography component="span" sx={{ color: statusColor[task.status] }}>
            Status: {task.status}
          </Typography>
        </Box>
        <Typography sx={{ mt: 0.5, fontSize: 14 }}>
          Due: {task.due_date || "N/A"}
        </Typography>
        <Button
          variant="contained"
          color={task.status === "DONE" ? "secondary" : "primary"}
          onClick={onToggle}
          sx={{ mt: 1 }}
        >
          {task.status === "DONE" ? "Undo" : "Next Status"}
        </Button>
      </CardContent>
    </Card>
  );
}

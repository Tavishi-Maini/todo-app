import React, { useState, useEffect } from "react";
import API from "../lib/api";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

export default function Teams() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    const res = await API.get("teams/"); // optional: implement GET teams endpoint
    setTeams(res.data);
  };

  const createTeam = async () => {
    await API.post("teams/create/", { name: teamName });
    setTeamName("");
    fetchTeams();
  };

  const joinTeam = async (id) => {
    await API.post(`teams/${id}/join/`);
    fetchTeams();
  };

  useEffect(() => { fetchTeams(); }, []);

  return (
    <div>
      <Card sx={{ mt: 3, p: 2 }}>
        <TextField label="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} />
        <Button sx={{ mt: 1 }} onClick={createTeam} variant="contained">Create Team</Button>
      </Card>

      {teams.map(team => (
        <Card key={team.id} sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6">{team.name}</Typography>
          <Button onClick={() => joinTeam(team.id)}>Join Team</Button>
        </Card>
      ))}
    </div>
  );
}

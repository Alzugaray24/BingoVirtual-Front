import React from "react";
import { Typography, Button, Card, CardContent, Box } from "@mui/material";

const GameCard = ({ game, onDelete, onJoin }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Juego ID: {game._id}
        </Typography>
        <Typography variant="body1">
          <strong>Estado:</strong> {game.gameStatus}
        </Typography>
        <Typography variant="body2">
          <strong>Fecha de inicio:</strong>{" "}
          {new Date(game.startDate).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Jugadores:</strong>{" "}
          {game.players.length > 0 ? game.players.length : "No hay jugadores"}
        </Typography>

        <Box display="flex" gap={1} mt={2}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete(game._id)}
          >
            Eliminar
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onJoin(game._id)}
          >
            Unirse
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GameCard;

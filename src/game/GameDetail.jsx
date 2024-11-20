import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import useSocket from "../hooks/useSocket";
import { setCurrentGame } from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";

const GameDetail = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.game.currentGame);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );

  const { startGame } = useSocket({
    onNewPlayer: (newPlayer) => {
      dispatch(
        setCurrentGame({
          ...currentGame,
          players: [...currentGame.players, newPlayer],
        })
      );
    },
    onPlayerJoined: (userId) => {
      dispatch(
        setSuccessMessage({
          message: `El jugador con ID ${userId} se unió a la partida.`,
          messageType: "info",
        })
      );
    },
  });

  useEffect(() => {
    if (!currentGame) {
      console.error("No hay un juego seleccionado.");
    }
  }, [currentGame]);

  if (!currentGame) {
    return (
      <Box p={3}>
        <Typography variant="h5">No hay un juego seleccionado.</Typography>
      </Box>
    );
  }

  const handleStartGame = () => {
    startGame(currentGame._id);
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Detalles del Juego
      </Typography>

      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => dispatch(clearSuccessMessage())}
        >
          <Alert
            onClose={() => dispatch(clearSuccessMessage())}
            severity={messageType || "info"}
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      <Typography variant="h6" mb={2}>
        Jugadores en la partida: {currentGame.players.length}
      </Typography>

      <List>
        {currentGame.players.map((player, index) => (
          <React.Fragment key={player.userId._id || player.userId}>
            <ListItem>
              <Box>
                <Typography variant="body1">
                  <strong>Jugador {index + 1}</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>ID:</strong> {player.userId._id || player.userId}
                </Typography>
                <Typography variant="body2">
                  <strong>Card:</strong>
                </Typography>
                <Box
                  component="table"
                  border={1}
                  borderColor="gray"
                  sx={{
                    borderCollapse: "collapse",
                    marginTop: "8px",
                  }}
                >
                  <tbody>
                    {player.card.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((number, colIndex) => (
                          <td
                            key={colIndex}
                            style={{
                              border: "1px solid gray",
                              padding: "4px",
                              textAlign: "center",
                              width: "30px",
                              height: "30px",
                            }}
                          >
                            {number}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={currentGame.players.length < 3}
        >
          Iniciar Juego
        </Button>
      </Box>
    </Box>
  );
};

export default GameDetail;

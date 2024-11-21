import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { setCurrentGame } from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGame = useSelector((state) => state.game.currentGame);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );
  const loading = useSelector((state) => state.requestStatus.loading);

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
      navigate("/");
    }
  }, [currentGame, navigate]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  const handleStartGame = () => {
    startGame(currentGame._id);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentGame) {
    return (
      <Box p={3}>
        <Typography variant="h5">No hay un juego seleccionado.</Typography>
      </Box>
    );
  }

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

      <Grid container spacing={2}>
        {currentGame.players.map((player, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={player.userId._id || player.userId}
          >
            <Card>
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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

import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PlayerList from "./PlayerList";

const GameDetails = ({ game }) => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Jugadores en la partida: {game.players.length}
      </Typography>
      <PlayerList players={game.players} />
    </Box>
  );
};

GameDetails.propTypes = {
  game: PropTypes.shape({
    players: PropTypes.array.isRequired,
  }).isRequired,
};

export default GameDetails;

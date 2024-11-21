import { Box, Typography } from "@mui/material";
import GameCard from "./GameCard";
import PropTypes from "prop-types";

const GameList = ({
  games,
  userId,
  onJoinGame,
  onDeleteGame,
  onRemovePlayer,
}) => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Juegos Disponibles:
      </Typography>
      {games.length === 0 ? (
        <Typography>No hay juegos disponibles.</Typography>
      ) : (
        games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            userId={userId}
            onJoinGame={onJoinGame}
            onDeleteGame={onDeleteGame}
            onRemovePlayer={onRemovePlayer}
          />
        ))
      )}
    </Box>
  );
};
GameList.propTypes = {
  games: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  onJoinGame: PropTypes.func.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
};

export default GameList;

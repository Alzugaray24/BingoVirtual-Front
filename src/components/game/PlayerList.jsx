import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PlayerList = ({ players }) => {
  return (
    <Grid container spacing={2}>
      {players.map((player, index) => (
        <Grid item xs={12} key={player.userId._id || player.userId}>
          <Typography variant="body1">
            {index + 1}. ID del Jugador: {player.userId._id || player.userId}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ _id: PropTypes.string }),
      ]).isRequired,
    })
  ).isRequired,
};

export default PlayerList;

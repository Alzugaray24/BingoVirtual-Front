import { Card, CardContent, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import BingoCell from "./BingoCell";
import useSocket from "../../hooks/useSocket";

const BingoCard = ({ card, markedNumbers, gameId, userId }) => {
  const { markBall } = useSocket({});

  const handleMarkBall = (number) => {
    markBall(gameId, userId, number);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto" }}>
      <CardContent>
        <Typography variant="h5" align="center" mb={2}>
          Tu Tarjeta de Bingo
        </Typography>
        <Grid container spacing={1}>
          {card.map((row, rowIndex) => (
            <Grid container item xs={12} key={rowIndex} spacing={1}>
              {row.map((number, colIndex) => (
                <Grid item xs={2.4} key={colIndex}>
                  <BingoCell
                    number={number}
                    isMarked={markedNumbers.includes(number)}
                    onClick={() => handleMarkBall(number)}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
BingoCard.propTypes = {
  card: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  markedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  gameId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default BingoCard;

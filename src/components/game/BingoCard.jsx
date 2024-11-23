import { Card, CardContent, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import BingoCell from "./BingoCell";

const BingoCard = ({ card, markedBalls, onMarkBall }) => {
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
                    isMarked={markedBalls.includes(number)}
                    onClick={() => onMarkBall(number)}
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
  markedBalls: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMarkBall: PropTypes.func.isRequired,
};

export default BingoCard;

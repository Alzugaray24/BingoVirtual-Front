import { Button } from "@mui/material";
import PropTypes from "prop-types";

const BingoCell = ({ number, isMarked, onClick }) => {
  return (
    <Button
      variant="contained"
      color={isMarked ? "success" : "primary"}
      onClick={onClick}
      fullWidth
      sx={{
        height: 60,
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: isMarked ? "#4caf50" : "#2196f3",
        "&:hover": {
          backgroundColor: isMarked ? "#388e3c" : "#1976d2",
        },
      }}
    >
      {number}
    </Button>
  );
};
BingoCell.propTypes = {
  number: PropTypes.number.isRequired,
  isMarked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BingoCell;

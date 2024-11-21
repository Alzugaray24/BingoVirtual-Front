import PropTypes from "prop-types";
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ loading, text, onClick, ...props }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClick}
      disabled={loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : null
      }
      {...props}
    >
      {loading ? "Cargando..." : text}
    </Button>
  );
};
SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubmitButton;

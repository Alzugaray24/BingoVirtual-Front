import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <Typography sx={{ color: "red", mb: 2 }}>Error: {error}</Typography>;
};
ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;

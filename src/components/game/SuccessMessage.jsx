import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const SuccessMessage = ({ message, messageType }) => {
  if (!message) return null;

  return (
    <Typography
      sx={{ color: messageType === "success" ? "green" : "blue", mb: 2 }}
    >
      {message}
    </Typography>
  );
};
SuccessMessage.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
};

export default SuccessMessage;

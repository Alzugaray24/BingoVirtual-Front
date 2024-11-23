import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccessMessage } from "../store/slices/successMessageSlice";

const UserMessage = () => {
  const dispatch = useDispatch();
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );

  const validMessageTypes = ["success", "info", "warning", "error"];
  const severity = validMessageTypes.includes(messageType)
    ? messageType
    : "info";

  const handleCloseSnackbar = () => {
    dispatch(clearSuccessMessage());
  };

  return (
    <Snackbar
      open={!!successMessage}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

export default UserMessage;

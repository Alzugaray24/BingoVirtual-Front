import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";

const CustomModal = ({ isOpen, type, message, onConfirm, onCancel }) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          border: "2px solid",
          borderColor: type === "confirm" ? "#1976d2" : "#4caf50", // Color dinámico según el tipo
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: type === "confirm" ? "#1976d2" : "#4caf50", // Estilo del título según el tipo
          }}
        >
          {type === "confirm" ? "Confirmación" : "Información"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.primary",
            fontSize: "1.2rem",
          }}
        >
          {message || "¿Estás seguro de continuar?"}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {type === "confirm" && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onConfirm}
                sx={{
                  minWidth: "100px",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Sí
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant={type === "confirm" ? "outlined" : "contained"}
              color="error"
              onClick={onCancel}
              sx={{
                minWidth: "100px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              {type === "confirm" ? "No" : "Cerrar"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Controla si el modal está abierto
  type: PropTypes.oneOf(["confirm", "info"]).isRequired, // Tipo de modal
  message: PropTypes.string.isRequired, // Mensaje a mostrar
  onConfirm: PropTypes.func, // Acción al presionar "Sí" (opcional)
  onCancel: PropTypes.func.isRequired, // Acción al presionar "No" o cerrar
};

export default CustomModal;

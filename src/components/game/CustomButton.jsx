import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CustomButton = ({
  text,
  onClick,
  color = "primary",
  variant = "contained",
  size = "medium",
  borderRadius = "4px",
  fullWidth = false,
  disabled = false,
  icon = null,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={icon} // Agrega un ícono opcional al inicio del botón
      sx={{
        borderRadius,
        textTransform: "none", // Evita texto en mayúsculas
        fontWeight: 600, // Aumenta el peso de la fuente para un look más profesional
        padding: "8px 16px", // Ajusta el padding predeterminado
        transition: "all 0.3s ease", // Transición suave para hover y focus
        boxShadow:
          variant === "contained" ? "0px 4px 6px rgba(0,0,0,0.1)" : "none", // Sombra profesional para botones "contained"
        "&:hover": {
          backgroundColor: color === "primary" ? "#0056b3" : undefined, // Cambia el color al hover (personalizable)
        },
        ...sx, // Permite estilos personalizados adicionales
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ]),
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  borderRadius: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node, // Permite un ícono opcional
  sx: PropTypes.object, // Permite estilos personalizados
};

export default CustomButton;

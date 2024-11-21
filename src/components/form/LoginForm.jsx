import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "./Form";

const LoginForm = ({ onLogin, loading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const successMessage = useSelector(
    (state) => state.successMessage.successMessage
  );
  const messageType = useSelector((state) => state.successMessage.messageType);
  const navigate = useNavigate();

  const handleSubmit = () => {
    onLogin(email, password);
  };

  const fields = [
    {
      label: "Correo electrónico",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      autoComplete: "username",
      required: true,
      type: "text",
    },
    {
      label: "Contraseña",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: "current-password",
      required: true,
      type: "password",
    },
  ];

  const link = {
    text: "Regístrate",
    onClick: () => navigate("/register"),
    message: "¿No tienes cuenta?",
  };

  return (
    <Form
      title="Iniciar sesión"
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      successMessage={successMessage}
      error={error}
      messageType={messageType}
      link={link}
    />
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default LoginForm;

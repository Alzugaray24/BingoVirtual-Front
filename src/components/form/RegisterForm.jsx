import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "./Form";

const RegisterForm = ({ onRegister, loading, error }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const successMessage = useSelector(
    (state) => state.successMessage.successMessage
  );
  const messageType = useSelector((state) => state.successMessage.messageType);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await onRegister(email, fullName, password);
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
      label: "Nombre completo",
      value: fullName,
      onChange: (e) => setFullName(e.target.value),
      required: true,
      type: "text",
    },
    {
      label: "Contraseña",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: "new-password",
      required: true,
      type: "password",
    },
  ];

  const link = {
    text: "Inicia sesión",
    onClick: () => navigate("/login"),
    message: "¿Ya tienes cuenta?",
  };

  return (
    <Form
      title="Crear cuenta"
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

export default RegisterForm;

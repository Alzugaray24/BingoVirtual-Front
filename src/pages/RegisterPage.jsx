import React from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../components/form/RegisterForm";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const error = useSelector((state) => state.requestStatus.error);
  const loading = useSelector((state) => state.requestStatus.loading);
  const { handleRegister } = useAuth();

  const handleRegisterSubmit = async (email, fullName, password) => {
    await handleRegister(email, fullName, password);
  };

  return (
    <RegisterForm
      onRegister={handleRegisterSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default RegisterPage;

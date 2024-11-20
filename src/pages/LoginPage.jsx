import { useSelector } from "react-redux";
import LoginForm from "../components/form/LoginForm";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const error = useSelector((state) => state.requestStatus.error);
  const loading = useSelector((state) => state.requestStatus.loading);
  const { handleLogin } = useAuth();

  const handleLoginSubmit = async (email, password) => {
    await handleLogin(email, password);
  };

  return (
    <LoginForm onLogin={handleLoginSubmit} error={error} loading={loading} />
  );
};

export default LoginPage;

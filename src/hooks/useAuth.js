import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../store/slices/authSlice";
import authController from "../controllers/authController";
import {
  setLoading,
  setError,
  clearError,
} from "../store/slices/requestStatusSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      const { token, userId } = await authController.login(email, password);

      localStorage.setItem("token", token);

      dispatch(setAuthData({ token, userId }));
      dispatch(
        setSuccessMessage({
          message: "Inicio de sesión exitoso",
          messageType: "success",
        })
      );

      setTimeout(() => {
        dispatch(clearSuccessMessage());
        navigate("/home");
      }, 2000);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async (email, fullName, password) => {
    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      await authController.register(email, fullName, password);

      dispatch(
        setSuccessMessage({
          message: "Registro exitoso, por favor inicia sesión",
          messageType: "success",
        })
      );

      setTimeout(() => {
        dispatch(clearSuccessMessage());
        navigate("/login");
      }, 2000);
    } catch (err) {
      dispatch(setError(err.message));

      return { success: false, error: err.message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default useAuth;

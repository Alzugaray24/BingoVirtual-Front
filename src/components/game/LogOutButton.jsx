import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearAuthData } from "../../store/slices/authSlice";
import { clearSuccessMessage } from "../../store/slices/successMessageSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthData());
    dispatch(clearSuccessMessage());
    navigate("/login");
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;

import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../game/Home";
import GameDetail from "../game/GameDetail";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game-detail/:gameId" element={<GameDetail />} />
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;

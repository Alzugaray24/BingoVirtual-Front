import { login, register } from "../services/authService";

const authController = {
  login: async (email, password) => {
    try {
      console.log("click");
      const { token, user, userId } = await login(email, password);

      return { token, user, userId };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  register: async (email, fullName, password) => {
    try {
      const { token, user } = await register(email, fullName, password);
      return { token, user };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

export default authController;

import { useApi } from "../hooks/useApi";

export const useAuthService = () => {
  const { post, get } = useApi();

  const signup = async (data) => {
    return await post("/auth/signup", data);
  };

  const login = async (data) => {
    return await post("/auth/login", data);
  };

  const getMe = async () => {
    return await get("/me");
  };

  return { signup, login, getMe };
};

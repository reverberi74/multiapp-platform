import { useSelector } from "react-redux";
import axiosClient from "../config/axiosClient";
import { ApiContext } from "./apiContext";

export const ApiProvider = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const get = async (path) => {
    const response = await axiosClient.get(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const post = async (path, payload) => {
    const response = await axiosClient.post(path, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const put = async (path, payload) => {
    const response = await axiosClient.put(path, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const del = async (path) => {
    const response = await axiosClient.delete(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const login = async (payload) => {
    payload.role = payload.role || "user";
    const response = await axiosClient.post("/auth/login", payload);
    return response.data;
  };

  return (
    <ApiContext.Provider value={{ get, post, put, del, login }}>
      {children}
    </ApiContext.Provider>
  );
};

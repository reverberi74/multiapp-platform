import { useContext } from "react";
import { ApiContext } from "./apiContext";

export const useApi = () => {
  return useContext(ApiContext);
};

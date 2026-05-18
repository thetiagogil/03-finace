import { useAuth } from "./useAuth";

export const useCurrentUser = () => {
  return useAuth().user;
};

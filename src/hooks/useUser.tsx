import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { USER } from "../context/ContextTypes";

type useUserType = {
  user: USER | null;
  login: (userData: USER) => void;
  logout: () => void;
};
const useUser = (): useUserType => {
  const { state, login, logout } = useContext(UserContext);
  return { user: state.user, login, logout };
};

export default useUser;

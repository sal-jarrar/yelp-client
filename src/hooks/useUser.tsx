import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { USER } from "../contexts/ContextTypes";

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

import { ReactElement, createContext } from "react";

import {
  ChildrenType,
  StateType,
  TokenType,
  USER,
  UseUserContextType,
} from "./ContextTypes";
import useUserContext from "./useContext";
import jwtDecode from "jwt-decode";

export const initState: StateType = {
  user: null,
};
const token = localStorage.getItem("token");

if (token) {
  const decodeToken = jwtDecode<TokenType>(token);
  if (decodeToken.exp && decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initState.user = decodeToken;
  }
}

const initContextState: UseUserContextType = {
  state: initState,
  login: (userData: USER) => {},
  logout: () => {},
};

export const UserContext = createContext<UseUserContextType>(initContextState);

export const UserProvider = ({
  children,
  ...initState
}: StateType & ChildrenType): ReactElement => {
  return (
    <UserContext.Provider value={useUserContext(initState)}>
      {children}
    </UserContext.Provider>
  );
};

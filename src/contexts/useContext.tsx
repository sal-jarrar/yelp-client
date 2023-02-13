import { useReducer } from "react";
import {
  REDUCER_ACTION,
  REDUCER_ACTION_TYPE,
  StateType,
  USER,
} from "./ContextTypes";

const reducer = (state: StateType, actions: REDUCER_ACTION): StateType => {
  switch (actions.type) {
    case REDUCER_ACTION_TYPE.LOGIN:
      return { ...state, user: actions.payload as USER };
    case REDUCER_ACTION_TYPE.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

const useUserContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const login = (userData: USER) => {
    localStorage.setItem("token", userData.token as string);
    dispatch({ type: REDUCER_ACTION_TYPE.LOGIN, payload: userData });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };
  return { state, login, logout };
};

export default useUserContext;

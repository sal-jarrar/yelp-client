import { ReactElement } from "react";
import useUserContext from "./useContext";
import { JwtPayload } from "jwt-decode";

export type USER = {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  exp?: string;
  iat?: string;
};

export type StateType = {
  user: USER | null;
};

export type REDUCER_ACTION = {
  type: REDUCER_ACTION_TYPE;
  payload?: USER;
};

export type UseUserContextType = ReturnType<typeof useUserContext>;

export type ChildrenType = {
  children?: ReactElement | undefined;
};

export const enum REDUCER_ACTION_TYPE {
  LOGIN,
  LOGOUT,
}

export type TokenType = JwtPayload & USER;

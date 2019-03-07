import { LOGOUT, SET_CURRENT_USER } from "../types";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const logout = () => {
  return { type: LOGOUT };
};

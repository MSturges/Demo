// auth constants
export const LOGOUT = "LOGOUT";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const logout = () => {
  return { type: LOGOUT };
};

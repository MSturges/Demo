import { REHYDRATE } from "redux-persist";
import Immutable from "seamless-immutable";

import { LOGOUT, SET_CURRENT_USER } from "../types";

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      const { payload = {} } = action;
      return Immutable(payload.auth || state);
    case SET_CURRENT_USER:
      // TODO
      // this is hacky, I also need the jwt in my apollo-client configuration
      // might need to rethink using redux-persist..
      localStorage.setItem("catJWT", action.user.jwt);
      //
      return state.merge(action.user);
    case LOGOUT:
      // hacky, don't like.
      localStorage.removeItem("catJWT");
      //
      return Immutable({});
    default:
      return state;
  }
};

export default AuthReducer;

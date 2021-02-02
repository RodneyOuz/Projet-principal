import jwtDecode from 'jwt-decode';

import {LOG_OUT, SUCCESSFUL_LOGIN} from "../constants/actions";
const initialState = {
  token: '',
  user_id: '',
  isLoggedIn: false,
  isAdmin: false,
};

const getUserInfos = token => {
  const content = jwtDecode(token);
  const user_id = content.sub;
  const isAdmin = content.context.isAdmin;
  return {
    user_id, isAdmin
  };
};

const reducer = {
  [SUCCESSFUL_LOGIN]: (state, token) => ({
    ...state,
    token,
    isLoggedIn: true,
    ...getUserInfos(token)
  }),
  [LOG_OUT]: () => initialState
};

export const auth = (state = initialState, action) => {
  const handler = reducer[action.type];
  return handler ? handler(state, action.payload) : state;
};

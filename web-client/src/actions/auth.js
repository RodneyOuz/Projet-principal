import axios from 'axios';
import {backend_url} from "../constants/backend";
import {ERROR_LOGIN, LOG_OUT, SUCCESSFUL_LOGIN} from "../constants/actions";

export const login = (email, password) => dispatch =>
  axios.post(`${backend_url}/auth/login`, {email, password})
    .then(data => dispatch(successfulLogin(data)))
    .catch(data => dispatch(errorLogin(data)));

export const successfulLogin = payload => ({
  type: SUCCESSFUL_LOGIN,
  payload
});

export const errorLogin = ({data: payload}) => ({
  type: ERROR_LOGIN,
  payload
});

export const logout = () => ({
  type: LOG_OUT,
});

import * as APIUtil from '../util/session_api';
import jwtDecode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(null);
  dispatch(logoutUser());
};


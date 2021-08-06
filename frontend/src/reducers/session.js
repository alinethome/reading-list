import { RECEIVE_USER_LOGOUT } from '../actions/session';

const initialState = {
  userLoggedIn: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;

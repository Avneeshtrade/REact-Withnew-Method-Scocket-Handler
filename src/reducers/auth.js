import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../constants/auth';

const authReducer = (state, action) => {
    switch (action.type) {
      case SIGN_OUT:
        return {token: null, email: ''};
      case SIGN_IN:
      case SIGN_UP:
        return {
          token: action.payload.token,
          email: action.payload.email,
        };
      default:
        return state;
    }
  };

export {
    authReducer
}
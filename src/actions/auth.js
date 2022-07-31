import { SIGN_IN, SIGN_OUT } from "../constants/auth";

const signup = dispatch => {
    return ({email, password}) => {
      console.log('Signup');
    };
  };
  
  const signin = dispatch => {
    return ({email, password}) => {
      // Do some API Request here
      console.log('Signin');
      dispatch({
        type: SIGN_IN,
        payload: {
          token: 'some access token here',
          email,
        },
      });
    };
  };
  
  const signout = dispatch => {
    return () => {
      dispatch({type: SIGN_OUT});
    };
  };

export {
    signin,
    signout,
    signup
}
import createDataContext from '.';
import {signin,signout,signup} from '../actions/auth';
import { authReducer } from '../reducers/auth';

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);
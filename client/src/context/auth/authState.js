import { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';

import { AUTH, LOGOUT } from '../types';

const AuthState = (props) => {
  const initialState = { authData: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const API = axios.create({ baseURL: `http://localhost:5000` });
  API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`;
    }
    return req;
  });

  //When login success using Google OAuth, set authData to result.
  const auth = (data) => {
    dispatch({
      type: AUTH,
      payload: data,
    });
  };

  //Logout user
  const userLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //User SignUp -> Means A New User Registering for the first time.
  const signup = async (formData, navigate) => {
    try {
      const { data } = await API.post('/users/signup', formData);
      console.log(data);
      dispatch({
        type: AUTH,
        payload: data,
      });
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //User SignIn -> Means a user already there and trying to login in his/her account.
  const signin = async (formData, navigate) => {
    try {
      const { data } = await API.post('/users/signin', formData);

      dispatch({
        type: AUTH,
        payload: data,
      });
      navigate('/');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData: state.authData,
        auth,
        userLogout,
        signup,
        signin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

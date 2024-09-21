import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SET_LOGIN } from '../redux/auth/AuthReducer';
import { api_url } from './../App';

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoginStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${api_url}/api/usersDetails/LoggedIn`);
      return res.data.LoggedIn;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error('Login status error:', message);
      toast.error(message);
      return false;
    }
  }, []);

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast("Session Expired, please login");
        navigate(path);
      }
    };

    redirectLoggedOutUser();
  }, [getLoginStatus, dispatch, navigate, path]);

};

export default useRedirectLoggedOutUser;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/AuthReducer";
import { useSelector } from "react-redux";

export const HideLink = ({ isLoggedIn }) => {
  const res = useSelector(selectIsLoggedIn);
  const [loggedInState, setLoggedInState] = useState(res); // Initial state
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/usersDetails/LoggedIn"
        );
        // ;
        setLoggedInState(response.data.LoggedIn); // Update state
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
 
  const ShowOnLogin = (
    <Link to="/Dashboard">
      <button className="btn font-semibold">Dashboard</button>
    </Link>
  );

  const ShowOnLogout = (
    <>
      <Link to="/register">
        <button className="btn mr-2 font-semibold">Register</button>
      </Link>
      <Link to="/login">
        <button className="btn font-semibold">Login</button>
      </Link>
    </>
  );

  return isLoading ? (
    <div>Loading please wait</div>
  ) : loggedInState ? (
    ShowOnLogin
  ) : (
    ShowOnLogout
  );
};

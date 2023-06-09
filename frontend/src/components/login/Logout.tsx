import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button/Button";
import classes from "./Logout.module.css";
import { setIsAuthenticated } from "../../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const LogoutPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("isAuthenticated");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch(setIsAuthenticated(false));
  };

  const handleCancel = () => {
    navigate("/myprofile");
  };

  return (
    <div className={classes.logout_page_container}>
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.logout_buttons}>
        <Button variant="primary" type="button" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LogoutPage;

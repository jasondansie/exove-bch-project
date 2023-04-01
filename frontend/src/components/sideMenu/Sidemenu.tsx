import React from "react";
import classes from "./Sidemenu.module.css";
import logo from "../../assets/img/logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks/hooks";
import HRMenus from "./HRMenus";
import ManagerMenus from "./ManagerMenu";
import UserMenus from "./UserMenus";
import { SetIsAuthenticatedAction } from "../../redux/reducers/login/loginReducer";
import { Button } from "react-bootstrap";

interface Iprops {
  image: string;
  name: string;
  role: string;
}
const Sidemenu = (props: Iprops) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );
  const navigate = useNavigate();

  const handleLogout = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch<SetIsAuthenticatedAction>({
      type: "SET_IS_AUTHENTICATED",
      payload: false,
    });
    navigate("/");
  };

  return (
    <div className={classes.sideMenu_content}>
      {" "}
      <div className={classes.logo_container}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h4>EXOVE</h4>
      </div>
      <div className={classes.line}></div>
      {isAuthenticated && (
        <>
          <div className={classes.menulist}>
            <h5 className={classes.sideMenu_headers}>Main Menu</h5>
            {selectedRole === "hr" && <HRMenus />}
            {selectedRole === "manager" && <ManagerMenus />}
            {selectedRole === "user" && <UserMenus />}
          </div>{" "}
          {location.pathname !== "/login" && (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Sidemenu;

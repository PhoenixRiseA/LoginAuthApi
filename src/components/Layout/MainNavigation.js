import { Link } from "react-router-dom";
import React, { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);
  const onLogoutHandler = (event) => {
    event.preventDefault();
    authCtx.logout();
    history.replace("/auth");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={onLogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

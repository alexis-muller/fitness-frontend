import { Button } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> | {/* <Link to="about">About</Link> |{" "} */}
      <Link to="routines">Routines</Link> |{" "}
      <Link to="activities">Activities</Link> |
      {token ? (
        <Fragment>
          <Link to="my-routines">My Routines</Link> |{" "}
          <Button onClick={onLogout}>Logout</Button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="login">Login</Link> | <Link to="sign-up">Sign Up</Link>
        </Fragment>
      )}
    </nav>
  );
};

export default Header;

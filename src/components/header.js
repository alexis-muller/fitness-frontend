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
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/routines">
            Fitness Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/routines">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/routines">
                  Routines
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              {token && (
                <li className="nav-item">
                  <Link className="nav-link" to="/my-routines">
                    My routines
                  </Link>
                </li>
              )}
            </ul>
            {token ? (
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <Fragment>
                <Link className="btn btn-outline-default me-2" to="/sign-up">
                  Signup
                </Link>
                <Link className="btn btn-success" to="/login">
                  Login
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

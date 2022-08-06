import { Fragment, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";

export default function Home({ token, setToken }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/routines", { replace: true });
    }
  }, []);

  return (
    <Fragment>
      <Header token={token} setToken={setToken} />
      <Outlet />
    </Fragment>
  );
}

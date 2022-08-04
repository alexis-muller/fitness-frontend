import { Fragment } from "react";
import { Outlet } from "react-router";
import Header from "./header";

export default function Home({ token, setToken }) {
  return (
    <Fragment>
      <Header token={token} setToken={setToken} />
      <Outlet />
    </Fragment>
  );
}

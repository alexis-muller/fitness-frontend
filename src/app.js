import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css";
import Home from "./components/home";
import Routines from "./components/routines";
import Activities from "./components/activities";
import Login from "./components/login";
import MyRoutines from "./components/my-routines";
import SignUp from "./components/sign-up";
import { Fragment, useState } from "react";
import { Button } from "@mui/material";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />}>
          <Route path="/routines" element={<Routines />}></Route>
          <Route
            path="/activities"
            element={<Activities token={token} />}
          ></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route
            path="/my-routines"
            element={<MyRoutines token={token} />}
          ></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

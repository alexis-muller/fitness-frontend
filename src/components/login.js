import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const loginUser = () => {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setToken(result.token);
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.user.username);
          navigate("/routines", { replace: true });
        } else {
          setErrorMessage(result.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //   alignItems: "center",
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <TextField
            // helperText="Please enter your name"

            id="demo-helper-text-aligned"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button variant="contained" component="label" onClick={loginUser}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

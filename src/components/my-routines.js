import { Button, Stack, Card } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyRoutines({ token }) {
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setMyRoutines(result);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <Fragment>
      <Box>
        <h1>My Routines</h1>
        {token && <Button>Add New Routine</Button>}
        <Stack spacing={2}>
          {myRoutines.length > 0 ? (
            <Fragment>
              {myRoutines.map((myRoutine) => {
                return "working";
              })}
            </Fragment>
          ) : (
            <Fragment>
              {/* <p>No Routines Found!</p> */}
              <Card style={{ padding: "10px" }}>
                <h3 style={{ marginBottom: "5px" }}>swimming</h3>
                <p style={{ marginTop: "0px" }}>water fun</p>
              </Card>
              <Card style={{ padding: "10px" }}>
                <h3 style={{ marginBottom: "5px" }}>breast stroke</h3>
                <p style={{ marginTop: "0px" }}>swimming laps</p>
              </Card>
            </Fragment>
          )}
        </Stack>
      </Box>
    </Fragment>
  );
}

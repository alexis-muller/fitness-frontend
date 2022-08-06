import {
  Button,
  Stack,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoutineCard from "./routine-card";

export default function MyRoutines({ token }) {
  const username = localStorage.getItem("username");

  const [myRoutines, setMyRoutines] = useState([]);
  const [routineModal, setRoutineModal] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchMyRoutines();
  }, []);

  const fetchMyRoutines = () => {
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
  };

  const onRoutineModalClose = () => {
    setRoutineModal(false);
  };

  const saveRoutine = () => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: routineName,
        goal: routineGoal,
        isPublic: true,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          fetchMyRoutines();
          onRoutineModalClose();
          setRoutineName("");
          setRoutineGoal("");
        } else {
          setErrorMessage(result.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Fragment>
      <Box>
        <h1>My Routines</h1>
        {token && (
          <Button onClick={() => setRoutineModal(true)}>Add New Routine</Button>
        )}
        <Stack spacing={2}>
          {myRoutines.length > 0 ? (
            <Fragment>
              {myRoutines.map((myRoutine, index) => {
                return (
                  <RoutineCard
                    key={index}
                    routine={myRoutine}
                    showCreator={false}
                    reloadData={fetchMyRoutines}
                  />
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <p>No Routines Found!</p>
            </Fragment>
          )}
        </Stack>

        {/* Add New Routine Dialog */}
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={routineModal}
          onClose={onRoutineModalClose}
        >
          <DialogTitle>Add New Routine</DialogTitle>
          <DialogContent>
            <form>
              <Stack spacing={2}>
                {errorMessage && <Typography>{errorMessage}</Typography>}
                <TextField
                  placeholder="Name"
                  value={routineName}
                  onChange={(e) => {
                    setRoutineName(e.target.value);
                  }}
                />
                <TextField
                  placeholder="Goal"
                  value={routineGoal}
                  onChange={(e) => {
                    setRoutineGoal(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  component="label"
                  onClick={saveRoutine}
                >
                  Save Routine
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </Fragment>
  );
}

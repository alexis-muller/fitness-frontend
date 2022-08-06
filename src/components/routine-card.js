import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ActivityCard from "./activity-card";

const RoutineCard = ({ routine, showCreator, reloadData }) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [editRoutineModal, setEditRoutineModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");

  const deleteRoutine = (routineId) => {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          reloadData();
        }
      })
      .catch(console.error);
  };

  const onEditRoutineModalOpen = () => {
    setRoutineName(routine.name);
    setRoutineGoal(routine.goal);
    setEditRoutineModal(true);
  };

  const onEditRoutineModalClose = () => {
    setEditRoutineModal(false);
  };

  const updateRoutine = () => {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: routineName,
        goal: routineGoal,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setErrorMessage(null);
          onEditRoutineModalClose();
          reloadData();
        } else {
          setErrorMessage(result.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Fragment>
      <Card style={{ padding: "10px" }}>
        <div style={{ display: "flex" }}>
          <h3
            style={{
              marginBottom: "5px",
              marginTop: "0px",
              flexGrow: 1,
            }}
          >
            {routine.name}
          </h3>
          {showCreator && <small>Created By: {routine.creatorName}</small>}
          {!showCreator && routine.creatorName === username && (
            <Fragment>
              <Button onClick={() => onEditRoutineModalOpen()}>Edit</Button>
              <Button onClick={() => deleteRoutine(routine.id)}>Delete</Button>
            </Fragment>
          )}
        </div>
        <p style={{ marginTop: "0px" }}>{routine.goal}</p>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>View Activities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {routine.activities.map((activity, index) => {
                return (
                  <ActivityCard
                    key={index}
                    name={activity.name}
                    description={activity.description}
                    duration={activity.duration}
                    count={activity.count}
                  />
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Card>

      {/* Edit Routine Dialog */}
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={editRoutineModal}
        onClose={onEditRoutineModalClose}
      >
        <DialogTitle>Edit Routine</DialogTitle>
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
                onClick={updateRoutine}
              >
                Update Routine
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default RoutineCard;

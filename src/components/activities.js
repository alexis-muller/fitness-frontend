import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./activity-card";

export default function Activities({ token }) {
  const [activities, setActivities] = useState([]);
  const [activityModal, setActivityModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("'");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/activities", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setActivities(result);
        }
      })
      .catch(console.error);
  }, []);

  const onActivityModalClose = () => {
    setActivityModal(false);
  };

  const saveActivity = () => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setName("");
          setDescription("");
          onActivityModalClose();
        } else {
          setErrorMessage(result.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Box>
      <h1>Activities</h1>
      {token && (
        <Button onClick={() => setActivityModal(true)}>Add New Activity</Button>
      )}
      <Stack spacing={2}>
        {activities.map((activity) => {
          return (
            <ActivityCard
              name={activity.name}
              description={activity.description}
            />
          );
        })}
      </Stack>

      {/* Add Activity Dialog */}
      <Dialog
        fullWidth="true"
        maxWidth="md"
        open={activityModal}
        onClose={onActivityModalClose}
      >
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <form>
            <Stack spacing={2}>
              {errorMessage && <Typography>{errorMessage}</Typography>}
              <TextField
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Button
                type="submit"
                variant="contained"
                component="label"
                onClick={saveActivity}
              >
                Save Activity
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

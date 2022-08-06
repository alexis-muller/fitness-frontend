import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import ActivityCard from "./activity-card";
import RoutineCard from "./routine-card";

export default function Routines({ token }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/routines", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setRoutines(result);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <Fragment>
      <Box>
        <h1>Routines</h1>
        {token && <Button>Add New Routine</Button>}
        <Stack spacing={2}>
          {routines.map((routine, index) => {
            return (
              <RoutineCard key={index} routine={routine} showCreator={true} />
            );
          })}
        </Stack>
      </Box>
    </Fragment>
  );
}

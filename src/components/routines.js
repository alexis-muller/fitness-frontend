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

export default function Routines({ token }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
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
          {routines.map((routine) => {
            return (
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
                  <small>Created By: {routine.creatorName}</small>
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
                      {routine.activities.map((activity) => {
                        return (
                          <ActivityCard
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
            );
          })}
        </Stack>
      </Box>
    </Fragment>
  );
}

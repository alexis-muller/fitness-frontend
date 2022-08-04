import { Card } from "@mui/material";
import React, { Fragment } from "react";

const ActivityCard = ({ name, description, count, duration }) => {
  return (
    <Fragment>
      <Card style={{ padding: "10px" }}>
        <h3 style={{ marginBottom: "5px" }}>{name}</h3>
        <p style={{ marginTop: "0px" }}>{description}</p>
        <div style={{ display: "flex" }}>
          {duration && (
            <p style={{ margin: "0px", marginRight: "5px" }}>
              Duration: {duration}
            </p>
          )}
          {count && <p style={{ margin: "0px" }}>Count: {count}</p>}
        </div>
      </Card>
    </Fragment>
  );
};

export default ActivityCard;

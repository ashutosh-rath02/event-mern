import { useState } from "react";
import Grid from "@mui/material/Grid";
import RecipeReviewCard from "./Card";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";

const EventsGrid = ({
  events,
  handleModifyBtn,
  handleDeleteBtn,
  handleRegisterBtn,
  handleDeregisterBtn,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-center">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 2rem",
        }}
      >
        <span style={{ color: "transparent" }}>.</span>
        <h2 style={{ alignItems: "center" }}>Our Events</h2>
        <Button
          className="btn btn-primary btn-lg modify self-end relative right-2"
          href="/create"
          variant="contained"
        >
          Add event
        </Button>
      </div>
      <div style={{ width: "50%", margin: "2rem auto" }}>
        <TextField
          label="Search Event"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <Grid
        container
        spacing={4}
        maxWidth={1240}
        margin={"auto"}
        textAlign={"left"}
      >
        {filteredEvents.map((event, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <RecipeReviewCard
              event={event}
              handleModifyBtn={handleModifyBtn}
              handleDeleteBtn={handleDeleteBtn}
              handleRegisterBtn={handleRegisterBtn}
              handleDeregisterBtn={handleDeregisterBtn}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

EventsGrid.propTypes = {
  events: PropTypes.array.isRequired,
  handleModifyBtn: PropTypes.func.isRequired,
  handleDeleteBtn: PropTypes.func.isRequired,
  handleRegisterBtn: PropTypes.func.isRequired,
  handleDeregisterBtn: PropTypes.func.isRequired,
};

export default EventsGrid;

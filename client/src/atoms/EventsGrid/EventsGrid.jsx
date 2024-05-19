import Grid from "@mui/material/Grid";
import RecipeReviewCard from "./Card";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const EventsGrid = ({
  events,
  handleModifyBtn,
  handleDeleteBtn,
  handleRegisterBtn,
  handleDeregisterBtn,
}) => {
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
        >
          Add event
        </Button>
      </div>
      <Grid
        container
        spacing={4}
        maxWidth={1240}
        margin={"auto"}
        textAlign={"left"}
      >
        {events.map((event, index) => (
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

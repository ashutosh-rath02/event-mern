import Grid from "@mui/material/Grid";
import RecipeReviewCard from "./Card";
import PropTypes from "prop-types";

const EventsGrid = ({
  events,
  handleModifyBtn,
  handleDeleteBtn,
  handleRegisterBtn,
  handleDeregisterBtn,
  title,
}) => {
  return (
    <div className="text-center">
      <h2 style={{ margin: "2rem 0" }}>{title}</h2>
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
  title: PropTypes.string.isRequired,
};

export default EventsGrid;

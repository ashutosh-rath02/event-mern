// import React from "react";
// import Grid from "@mui/material/Grid";
// import RecipeReviewCard from "./Card";

// const EventsGrid = ({ events }) => {
//   return (
//     <Grid container spacing={3}>
//       {events.map((event, index) => (
//         <Grid key={index} item xs={12} sm={6} md={4}>
//           <RecipeReviewCard event={event} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default EventsGrid;
import Grid from "@mui/material/Grid";
import RecipeReviewCard from "./Card";

const EventsGrid = () => {
  return (
    <div className="text-center">
      <h2>Our Events</h2>
      <Grid
        container
        spacing={2}
        maxWidth={1240}
        margin={"auto"}
        textAlign={"left"}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <RecipeReviewCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EventsGrid;

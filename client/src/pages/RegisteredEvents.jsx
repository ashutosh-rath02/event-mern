import { useEffect, useState } from "react";
import Loader from "../atoms/Loader";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useGetRegisteredEventsMutation } from "../slices/eventsApiSlice";
import { useSelector } from "react-redux";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [getRegisteredEvents, { isLoading }] = useGetRegisteredEventsMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      fetchRegisteredEvents();
    }
  }, [userInfo]);

  const fetchRegisteredEvents = async () => {
    try {
      const res = await getRegisteredEvents(userInfo._id).unwrap();
      setRegisteredEvents(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h1>Registered Events</h1>
      <Grid container spacing={2}>
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={event.eventName}
                  subheader={new Date(event.date).toLocaleDateString()}
                  // action={
                  //   <Box display="flex">
                  //     <IconButton onClick={() => handleModifyBtn(event)}>
                  //       <FaSlidersH />
                  //     </IconButton>
                  //     <IconButton onClick={() => handleDeleteBtn(event)}>
                  //       <MdDelete />
                  //     </IconButton>
                  //   </Box>
                  // }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    event.photo ||
                    "https://res.cloudinary.com/dhnkuonev/image/upload/v1705600831/tx9lsuldgeqmo6ztwjxw.png"
                  }
                  alt={event.eventName}
                />
                <Chip
                  className="mt-2 p-2"
                  style={{ marginLeft: "1rem", display: "inline-flex" }}
                  label={event.category || "Category"}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  my={2}
                  mx={2}
                >
                  <Typography variant="body1">{`${event.startTime} - ${event.endTime}`}</Typography>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <p>You have not registered for any events yet.</p>
        )}
      </Grid>
    </div>
  );
};

export default RegisteredEvents;

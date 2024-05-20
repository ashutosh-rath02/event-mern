/* eslint-disable no-unused-vars */
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
import {
  useDeregisterFromEventMutation,
  useGetEventsMutation,
  useGetRegisteredEventsMutation,
  useGetSuggestedEventsMutation,
} from "../slices/eventsApiSlice";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [getRegisteredEvents, { isLoading }] = useGetRegisteredEventsMutation();
  const [deregisterFromEvent] = useDeregisterFromEventMutation();
  const [getEvents, { isLoading: isGetEventsLoading }] = useGetEventsMutation();
  const [getSuggestedEvents] = useGetSuggestedEventsMutation();

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

  const fetchEvents = async () => {
    try {
      const res = await getEvents().unwrap();
      setEvents(res);

      // Extract categories from events
      const eventCategories = [...new Set(res.map((event) => event.category))];
      setCategories(eventCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSuggestedEvents = async () => {
    try {
      const res = await getSuggestedEvents().unwrap();
      setSuggestedEvents(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeregisterBtn = async (eventId) => {
    try {
      await deregisterFromEvent(eventId).unwrap();
      toast.success("Successfully deregistered from the event!");

      // Update the registered events state
      setRegisteredEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      fetchEvents();
      fetchSuggestedEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeregisterBtn(event._id)}
                    style={{ backgroundColor: "#C62828", color: "white" }}
                  >
                    DEREGISTER
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50vh",
            }}
          >
            <p>You have not registered for any events yet.</p>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default RegisteredEvents;

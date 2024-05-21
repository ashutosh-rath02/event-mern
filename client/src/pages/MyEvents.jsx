import { useEffect, useState } from "react";
import {
  useGetEventsCreatedByUserMutation,
  useDeleteEventMutation,
} from "../slices/eventsApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FaSlidersH } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Card } from "react-bootstrap";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [getEventsCreatedByUser, { isLoading }] =
    useGetEventsCreatedByUserMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      fetchMyEvents();
    }
  }, [userInfo]);

  const fetchMyEvents = async () => {
    try {
      const res = await getEventsCreatedByUser(userInfo._id).unwrap();
      setMyEvents(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModifyBtn = (event) => {
    navigate("/update", { state: event });
  };

  const handleDeleteBtn = async (eventId) => {
    try {
      await deleteEvent(eventId).unwrap();
      toast.success("Event deleted successfully!");
      fetchMyEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h1>My Events</h1>
      <Grid container spacing={3}>
        {myEvents.length > 0 ? (
          myEvents?.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={event.eventName}
                  subheader={new Date(event.date).toLocaleDateString()}
                  action={
                    <Box display="flex">
                      <IconButton onClick={() => handleModifyBtn(event)}>
                        <FaSlidersH />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteBtn(event._id)}>
                        <MdDelete />
                      </IconButton>
                    </Box>
                  }
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50vh",
            }}
          >
            <p>You have not created any events</p>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default MyEvents;

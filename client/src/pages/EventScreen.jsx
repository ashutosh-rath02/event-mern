/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetEventsMutation,
  useDeleteEventMutation,
  useRegisterForEventMutation,
  useDeregisterFromEventMutation,
  useGetSuggestedEventsMutation,
} from "../slices/eventsApiSlice";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import "../index.css";
import Banner from "../atoms/Carousel/Banner";
import EventsGrid from "../atoms/EventsGrid/EventsGrid";
import { Button, TextField } from "@mui/material";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const [getEvents, { isLoading }] = useGetEventsMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [registerForEvent] = useRegisterForEventMutation();
  const [deregisterFromEvent] = useDeregisterFromEventMutation();
  const [getSuggestedEvents] = useGetSuggestedEventsMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    fetchEvents();
    fetchSuggestedEvents();
  }, [userInfo.name]);

  const fetchEvents = async () => {
    try {
      const res = await getEvents().unwrap();
      setEvents(res);
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

  const handleModifyBtn = (item) => {
    navigate("/update", { state: item });
  };

  const handleDeleteBtn = async (item) => {
    try {
      const res = await deleteEvent(item._id).unwrap();
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleRegisterBtn = async (eventId) => {
    try {
      await registerForEvent(eventId).unwrap();
      toast.success("Successfully registered for the event!");
      fetchEvents();
      fetchSuggestedEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeregisterBtn = async (eventId) => {
    try {
      await deregisterFromEvent(eventId).unwrap();
      toast.success("Successfully deregistered from the event!");
      fetchEvents();
      fetchSuggestedEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const filteredSuggestedEvents = suggestedEvents.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <Banner />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <TextField
          label="Search Event"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          style={{ flex: 1, marginRight: "1rem" }}
        />
        <Button
          className="btn btn-primary btn-lg"
          href="/create"
          variant="contained"
        >
          Add Event
        </Button>
      </div>
      <div className="event-grid" style={{ margin: "0 2rem" }}>
        {isLoading && <Loader />}
        <EventsGrid
          title="Suggested Events"
          events={filteredSuggestedEvents}
          handleModifyBtn={handleModifyBtn}
          handleDeleteBtn={handleDeleteBtn}
          handleRegisterBtn={handleRegisterBtn}
          handleDeregisterBtn={handleDeregisterBtn}
        />
      </div>

      <hr style={{ margin: "2rem" }} />

      <div className="event-grid" style={{ margin: "0 2rem" }}>
        {isLoading && <Loader />}
        <EventsGrid
          title="Our Events"
          events={filteredEvents}
          handleModifyBtn={handleModifyBtn}
          handleDeleteBtn={handleDeleteBtn}
          handleRegisterBtn={handleRegisterBtn}
          handleDeregisterBtn={handleDeregisterBtn}
        />
      </div>
    </div>
  );
};

export default EventScreen;

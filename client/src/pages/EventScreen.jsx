/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetEventsMutation,
  useDeleteEventMutation,
  useRegisterForEventMutation,
  useDeregisterFromEventMutation,
} from "../slices/eventsApiSlice";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import "../index.css";
import Banner from "../atoms/Carousel/Banner";
import EventsGrid from "../atoms/EventsGrid/EventsGrid";
import { Button } from "react-bootstrap";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const [getEvents, { isLoading }] = useGetEventsMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [registerForEvent] = useRegisterForEventMutation();
  const [deregisterFromEvent] = useDeregisterFromEventMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    fetchEvents();
  }, [userInfo.name]);

  const fetchEvents = async () => {
    try {
      const res = await getEvents().unwrap();
      setEvents(res);
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
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeregisterBtn = async (eventId) => {
    try {
      await deregisterFromEvent(eventId).unwrap();
      toast.success("Successfully deregistered from the event!");
      fetchEvents();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Banner />

      <div className="event-grid">
        {isLoading && <Loader />}
        <EventsGrid
          events={events}
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

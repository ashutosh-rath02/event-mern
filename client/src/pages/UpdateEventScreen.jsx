/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../atoms/FormContainer";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";

import {
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../slices/eventsApiSlice";
import { getCurrentDate } from "../utils/checkDate";

const UpdateEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const _location = useLocation();
  const event = _location.state;
  // console.log(event);

  // const { userInfo } = useSelector((state) => state.auth);

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    setEventName(event.eventName);
    setDescription(event.description);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setCategory(event.category);
  }, [event]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateEvent({
        _id: event._id,
        eventName,
        description,
        date,
        startTime,
        endTime,
        category,
      }).unwrap();
      toast.success("Event updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteBtn = async (item) => {
    try {
      const res = await deleteEvent(item).unwrap();
      toast.success("Event deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleResetBtn = () => {
    setEventName(event.eventName);
    setDescription(event.description);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setCategory(event.category);
  };

  return (
    <FormContainer>
      <h1>Update Event</h1>

      <Form onSubmit={submitHandler}>
        {/* Name */}
        <Form.Group className="my-2" controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Description */}
        <Form.Group className="my-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Date */}
        <Form.Group className="my-2" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            min={getCurrentDate()}
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/*Start Time */}
        <Form.Group className="my-2" controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/*End Time */}
        <Form.Group className="my-2" controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Category */}
        <Form.Group className="my-2" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        {/* Button */}
        <div className="lineBtns">
          <Button type="submit" variant="primary" className="modify mt-3">
            Update
          </Button>

          <Button
            variant="secondary"
            className="delete mt-3"
            onClick={() => handleResetBtn()}
          >
            Reset
          </Button>

          <Button
            variant="secondary"
            className="delete mt-3"
            onClick={() => handleDeleteBtn(event)}
          >
            Delete
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default UpdateEventScreen;

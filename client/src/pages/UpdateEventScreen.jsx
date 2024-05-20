/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../atoms/FormContainer";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import axios from "axios";

import {
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../slices/eventsApiSlice";
import { getCurrentDate } from "../utils/checkDate";
import { set } from "mongoose";

const UpdateEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [club, setClub] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Cultural - Eastern European",
    "Cultural - Western European",
    "Cultural - Asian",
    "Cultural - Indian",
    "Cultural - African",
    "Cultural - Middle East",
    "Cultural - Hispanic",
    "Cultural - South American",
    "Arts/Film/Theatre",
    "Club Sports",
    "Exercise/Health",
    "Community Service",
    "Dance",
    "Dental",
    "Educational",
    "Engineering",
    "Faculty",
    "Greek Life",
    "Journal/Media",
    "LGBTQI",
    "Martial Arts",
    "Political",
    "Religious",
    "Social",
    "Technology",
    "Others",
  ];

  const navigate = useNavigate();
  const _location = useLocation();
  const event = _location.state;

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
    setClub(event.club);
    setImage(event.photo);
  }, [event]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/events/upload", formData, config);

      setImage(data.url);
      setUploading(false);
    } catch (error) {
      toast.error("Image upload failed");
      setUploading(false);
    }
  };

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
        club,
        photo: image,
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
    setClub(event.club);
  };

  return (
    <div style={{ margin: "2rem auto", width: "50%" }}>
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
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Club */}
          <Form.Group className="my-2" controlId="club">
            <Form.Label>Club</Form.Label>
            <Form.Control
              type="text"
              placeholder="Club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="my-2" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
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
    </div>
  );
};

export default UpdateEventScreen;

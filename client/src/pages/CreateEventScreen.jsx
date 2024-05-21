/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../atoms/FormContainer";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import axios from "axios";

import { useCreateEventMutation } from "../slices/eventsApiSlice";
import { getCurrentDate } from "../utils/checkDate";

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [club, setClub] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const resetForm = () => {
    setEventName("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCategory("");
    setClub("");
    setImage("");
    setErrors({});
  };

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

  const validateForm = () => {
    const newErrors = {};
    if (!eventName) newErrors.eventName = "Event name cannot be empty";
    if (!description) newErrors.description = "Description cannot be empty";
    if (!date) newErrors.date = "Date cannot be empty";
    if (!startTime) newErrors.startTime = "Start time cannot be empty";
    if (!endTime) newErrors.endTime = "End time cannot be empty";
    if (startTime && endTime && startTime >= endTime)
      newErrors.time = "Start time cannot be greater than end time";
    if (!category) newErrors.category = "Category cannot be empty";
    if (!club) newErrors.club = "Club cannot be empty";
    if (!image) newErrors.image = "Image cannot be empty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await createEvent({
        eventName,
        description,
        date,
        startTime,
        endTime,
        category,
        club,
        photo: image,
      }).unwrap();
      toast.success("Event created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{ margin: "2rem auto", width: "50%" }}>
      <FormContainer>
        <h1>Create Event</h1>

        <Form onSubmit={submitHandler}>
          {/* Event Name */}
          <Form.Group className="my-2" controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            ></Form.Control>
            {errors.eventName && (
              <div style={{ color: "red" }}>{errors.eventName}</div>
            )}
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
            {errors.description && (
              <div style={{ color: "red" }}>{errors.description}</div>
            )}
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
            {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}
          </Form.Group>

          {/* Start Time */}
          <Form.Group className="my-2" controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Enter Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            ></Form.Control>
            {errors.startTime && (
              <div style={{ color: "red" }}>{errors.startTime}</div>
            )}
          </Form.Group>

          {/* End Time */}
          <Form.Group className="my-2" controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Enter End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            ></Form.Control>
            {errors.endTime && (
              <div style={{ color: "red" }}>{errors.endTime}</div>
            )}
            {errors.time && <div style={{ color: "red" }}>{errors.time}</div>}
          </Form.Group>

          {/* Category */}
          <Form.Group className="my-2" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            {errors.category && (
              <div style={{ color: "red" }}>{errors.category}</div>
            )}
          </Form.Group>

          {/* Club */}
          <Form.Group className="my-2" controlId="club">
            <Form.Label>Club</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
            ></Form.Control>
            {errors.club && <div style={{ color: "red" }}>{errors.club}</div>}
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="my-2" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={uploadFileHandler}
            ></Form.Control>
            {errors.image && <div style={{ color: "red" }}>{errors.image}</div>}
            {uploading && <Loader />}
          </Form.Group>

          {isLoading && <Loader />}

          {/* Button */}
          <div className="lineBtns">
            <Button type="submit" variant="primary" className="modify mt-3">
              Create Event
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="delete mt-3"
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default CreateEventScreen;

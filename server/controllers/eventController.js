import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import { validateEvent } from "../utils/validateEvent.js";
import User from "../models/userModel.js";

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  const { eventName, category, description, photo, date, startTime, endTime } =
    req.body;

  if (await validateEvent(req)) {
    const event = await Event.create({
      eventName,
      category,
      description,
      photo,
      date,
      startTime,
      endTime,
      eventOwner: user._id,
    });

    if (event) {
      await User.findByIdAndUpdate(
        user._id,
        { $push: { myEvents: event._id } },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json({
        _id: event._id,
        eventName: event.eventName,
        category: event.category,
        description: event.description,
        photo:
          "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        eventOwner: event.eventOwner,
      });
      console.log("New Event: ", event, " by User: ", eventOwner);
    } else {
      res.status(400);
      throw new Error("Invalid event data");
    }
  } else {
    res.status(400);
    throw new Error("Event couldn't be created");
  }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const {
    _id,
    eventName,
    category,
    description,
    photo,
    date,
    startTime,
    endTime,
  } = req.body;

  const event = await Event.findById(_id);

  if (event) {
    if (await validateEvent(req)) {
      event.eventName = req.body.eventName || event.eventName;
      event.category = req.body.category || event.category;
      event.description = req.body.description || event.description;
      event.photo = req.body.photo || event.photo;
      event.date = req.body.date || event.date;
      event.startTime = req.body.startTime || event.startTime;
      event.endTime = req.body.endTime || event.endTime;

      const updatedEvent = await event.save();
      res.status(200).json({
        _id: updatedEvent._id,
        eventName: updatedEvent.eventName,
        category: updatedEvent.category,
        description: updatedEvent.description,
        photo: updatedEvent.photo,
        date: updatedEvent.date,
        startTime: updatedEvent.startTime,
        endTime: updatedEvent.endTime,
      });
    } else {
      res.status(404);
      throw new Error("Event can't be updated here");
    }
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const _id = req.body._id;
  const event = await Event.findById(_id);

  if (event) {
    await Event.deleteOne({ _id });
    res.status(200).json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// Get events created by a user
const getEventsCreatedByUser = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  const userId = user._id;
  try {
    const user = await User.findById(userId).select("myEvents");

    if (user) {
      const userEvents = await Event.find({ _id: { $in: user.myEvents } });

      res.json(userEvents);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get events created by a user
const getEventsRegisteredByUser = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  const userId = user._id;
  try {
    const user = await User.findById(userId).select("registeredEvents");

    if (user) {
      const registeredEvents = await Event.find({
        _id: { $in: user.registeredEvents },
      });

      res.json(registeredEvents);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register for an event
// @route   POST /api/events/register/:id
// @access  Private
const registerForEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if user is already registered for the event
  if (event.registeredUsers.includes(userId)) {
    res.status(400);
    throw new Error("User is already registered for this event");
  }

  event.registeredUsers.push(userId);
  user.registeredEvents.push(eventId);

  await event.save();
  await user.save();

  res.status(200).json({ message: "Successfully registered for the event" });
});

// @desc    Deregister from an event
// @route   POST /api/events/deregister
// @access  Private
const deregisterFromEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if user is registered for the event
  if (!event.registeredUsers.includes(userId)) {
    res.status(400);
    throw new Error("User is not registered for this event");
  }

  event.registeredUsers = event.registeredUsers.filter(
    (id) => id.toString() !== userId.toString()
  );
  user.registeredEvents = user.registeredEvents.filter(
    (id) => id.toString() !== eventId.toString()
  );

  await event.save();
  await user.save();

  res.status(200).json({ message: "Successfully deregistered from the event" });
});

export {
  createEvent,
  getEvents,
  getEventsCreatedByUser,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventsRegisteredByUser,
  deregisterFromEvent,
};

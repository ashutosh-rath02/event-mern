import Event from "../models/eventModel.js";

export const validateEvent = async (req) => {
  const events = await Event.find({});
  const { _id, eventName, category, description, date, startTime, endTime } =
    req.body;

  const hasDuplicate = events.some((event) => {
    const isDuplicate =
      event.eventName === eventName &&
      event.category === category &&
      event.description === description &&
      event.date === date &&
      event.startTime === startTime &&
      event.endTime === endTime;

    if (req.method.toString() === "POST") {
      return isDuplicate;
    }

    if (isDuplicate && event._id.toString() !== _id) {
      return isDuplicate;
    } else {
      return false;
    }
  });

  return !hasDuplicate;
};

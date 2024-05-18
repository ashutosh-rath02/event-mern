import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventOwner: {
      type: ObjectId,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;

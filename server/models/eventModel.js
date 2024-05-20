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
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    club: {
      type: String,
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

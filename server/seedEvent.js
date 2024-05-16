import mongoose from "mongoose";
import Event from "./models/eventModel.js";

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://event-mng:eventmng@cluster0.051w7ya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const events = [
  {
    eventName: "Event 1",
    category: "Category 1",
    description: "Description for Event 1",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "09:00 AM",
    endTime: "11:00 AM",
  },
  {
    eventName: "Event 2",
    category: "Category 2",
    description: "Description for Event 3",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "09:00 AM",
    endTime: "12:00 AM",
  },
  {
    eventName: "Event 3",
    category: "Category 3",
    description: "Description for Event 3",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "10:00 AM",
    endTime: "01:00 PM",
  },
  {
    eventName: "Event 4",
    category: "Category 4",
    description: "Description for Event 4",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "11:00 AM",
    endTime: "02:00 PM",
  },
  {
    eventName: "Event 5",
    category: "Category 5",
    description: "Description for Event 5",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "12:00 PM",
    endTime: "03:00 PM",
  },
  {
    eventName: "Event 6",
    category: "Category 4",
    description: "Description for Event 6",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "01:00 PM",
    endTime: "04:00 PM",
  },
  {
    eventName: "Event 7",
    category: "Category 3",
    description: "Description for Event 7",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "02:00 PM",
    endTime: "05:00 PM",
  },
  {
    eventName: "Event 8",
    category: "Category 2",
    description: "Description for Event 8",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "03:00 PM",
    endTime: "06:00 PM",
  },
  {
    eventName: "Event 9",
    category: "Category 1",
    description: "Description for Event 9",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "04:00 PM",
    endTime: "07:00 PM",
  },
  {
    eventName: "Event 10",
    category: "Category 4",
    description: "Description for Event 10",
    photo:
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1705581566/h69txfswc01izuoh27k8.webp",
    date: new Date(),
    startTime: "05:00 PM",
    endTime: "08:00 PM",
  },
];

// Seed events into the database
const seedEvents = async () => {
  try {
    // Clear existing events
    await Event.deleteMany();

    // Insert sample events
    await Event.insertMany(events);

    console.log("Events seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding events:", error.message);
    process.exit(1);
  }
};

seedEvents();

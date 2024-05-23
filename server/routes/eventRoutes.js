import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventsCreatedByUser,
  registerForEvent,
  getEventsRegisteredByUser,
  deregisterFromEvent,
  getSuggestedEvents,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createEvent);
router.route("/update").put(protect, updateEvent);
router.route("/:id").delete(protect, deleteEvent);
//check this
router.route("/").get(getEvents);
router.route("/profile").get(protect, getEventsCreatedByUser);
router.route("/register").post(protect, registerForEvent);
router.route("/registered-events").get(protect, getEventsRegisteredByUser);
router.route("/deregister").post(protect, deregisterFromEvent);
router.route("/suggested-events").get(getSuggestedEvents);
router.route("/upload").post(protect, upload.single("image"), (req, res) => {
  res.status(200).json({ url: req.file.path });
});

export default router;

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
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createEvent);
router.route("/update").put(protect, updateEvent);
router.route("/delete").delete(protect, deleteEvent);
//check this
router.route("/").get(protect, getEvents);
router.route("/profile").get(protect, getEventsCreatedByUser);
router.route("/register").post(protect, registerForEvent);
router.route("/registered-events").get(protect, getEventsRegisteredByUser);
router.route("/deregister").post(protect, deregisterFromEvent);

export default router;

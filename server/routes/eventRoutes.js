import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createEvent);
router.route("/update").put(protect, updateEvent);
router.route("/delete").delete(protect, deleteEvent);
//check this
router.route("/").get(protect, getEvents);
export default router;

import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbackByTeacherId,
  updateFeedback,
} from "../controllers/feedbackController";

const feedbackRouter = express.Router();

feedbackRouter.get("/", getAllFeedbacks);
feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/:teacherId", getFeedbackByTeacherId);
feedbackRouter.get("/:id", getFeedbackById);
feedbackRouter.put("/:id", updateFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;

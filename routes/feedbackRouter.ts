import express from "express";
import {
	createFeedback,
	deleteFeedback,
	getAllFeedbacks,
	getFeedbackById,
	getFeedbackByTeacherId,
	updateFeedback
} from "../controllers/feedbackController";
import { protect } from "../utils/auth";
import { getValidationRules, validate } from "../middleware/validator";
import checkRole from "../middleware/checkRole";

const feedbackRouter = express.Router();

feedbackRouter.get("/", [protect, checkRole("ADMIN")], getAllFeedbacks);

feedbackRouter.get("/:id", [protect], getFeedbackById);
feedbackRouter.get("/:teacherId", [protect], getFeedbackByTeacherId);

feedbackRouter.post(
	"/",
	[protect, ...getValidationRules("feedback").create, validate],
	createFeedback
);

feedbackRouter.put(
	"/:id",
	[protect, checkRole("ADMIN"), ...getValidationRules("feedback").put, validate],
	updateFeedback
);

feedbackRouter.delete(
	"/:id",
	[
		protect,
		checkRole("ADMIN"),
		...getValidationRules("feedback").delete,
		validate
	],
	deleteFeedback
);

export default feedbackRouter;

import express from "express";
import {
	createTeacher,
	deleteTeacher,
	getAllTeachers,
	teacherLogin,
	updateTeacherDetails
} from "../controllers/teacherController";
import { protect } from "../utils/auth";
import checkRole from "../middleware/checkRole";
import { getValidationRules, validate } from "../middleware/validator";

const teacherRouter = express.Router();

teacherRouter.get("/", [protect, checkRole("ADMIN")], getAllTeachers);

teacherRouter.post(
	"/login",
	[getValidationRules("teacher").login, validate],
	teacherLogin
);

teacherRouter.post(
	"/",
	[protect, checkRole("ADMIN"), getValidationRules("teacher").create, validate],
	createTeacher
);

teacherRouter.put(
	"/:id",
	[protect, checkRole("ADMIN"), getValidationRules("teacher").put],
	updateTeacherDetails
);

teacherRouter.delete(
	"/:id",
	[protect, checkRole("ADMIN")],
	getValidationRules("teacher").delete,
	deleteTeacher
);

export default teacherRouter;

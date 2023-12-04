import express from "express";
import {
  createTeacher,
  getAllTeachers,
  teacherLogin,
} from "../controllers/teacherController";
import { protect } from "../utils/auth";
import checkRole from "../middleware/checkRole";
import { getValidationRules, validate } from "../middleware/validator";

const teacherRouter = express.Router();



teacherRouter.get("/", getAllTeachers);

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

export default teacherRouter;

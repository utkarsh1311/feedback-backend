import express from "express";
import {
  createTeacher,
  getAllTeachers,
  teacherLogin,
} from "../controllers/teacherController";
import { protect } from "../utils/auth";
import checkRole from "../middleware/checkRole";

const teacherRouter = express.Router();

teacherRouter.post("/login", teacherLogin);

teacherRouter.get("/", [protect, checkRole("ADMIN")], getAllTeachers);
teacherRouter.post("/", [protect, checkRole("ADMIN")], createTeacher);


export default teacherRouter;

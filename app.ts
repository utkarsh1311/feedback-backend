import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler";
import feedbackRouter from "./routes/feedbackRouter";
import "express-async-errors";
import teacherRouter from "./routes/teacherRouter";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.use("/feedbacks", feedbackRouter);
app.use("/teachers", teacherRouter);

app.use(errorHandler);

export default app;

import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  
});
export default app;

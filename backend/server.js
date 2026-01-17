import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/job.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/job", jobRoutes);

app.get("/", (req, res) => {
  res.send("AI Job Description Generator Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

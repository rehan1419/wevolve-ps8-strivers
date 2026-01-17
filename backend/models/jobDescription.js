import mongoose from "mongoose";

const JobDescriptionSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("JobDescription", JobDescriptionSchema);

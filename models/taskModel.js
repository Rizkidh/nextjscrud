import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    judul: String,
    deskripsi: String,
    status: String,
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Created", "In-Progress", "Completed"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;

import mongoose from "mongoose";
const { Schema } = mongoose;

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    color: {
      type: String,
      default: "#cccccc",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Label", LabelSchema);

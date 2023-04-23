import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: String,
      default: "Zoya Chaudary",
    },
  },
  { timestamps: true }
);

export default mongoose.model("notices", noticeSchema);

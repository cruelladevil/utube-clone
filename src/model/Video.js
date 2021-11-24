import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 30 },
  description: { type: String, required: true, trim: true, minlength: 10 },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, required: true, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;

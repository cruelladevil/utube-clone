import express from "express";
import { watchVideo, getEditVideo, postEditVideo, deleteVideo, getUploadVideo, postUploadVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;

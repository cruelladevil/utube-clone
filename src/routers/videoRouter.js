import express from "express";
import { watchVideo, getEditVideo, postEditVideo, deleteVideo, getUploadVideo, postUploadVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter.route("/:id(\\d+)/edit").get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;

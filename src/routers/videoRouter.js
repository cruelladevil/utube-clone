import express from "express";
import { watchVideo, getEditVideo, postEditVideo, deleteVideo, getUploadVideo, postUploadVideo } from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUploadVideo).post(videoUpload.single("video"), postUploadVideo);

export default videoRouter;

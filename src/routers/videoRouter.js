import express from "express";
import { watchVideo, getEditVideo, postEditVideo, deleteVideo, uploadVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter.route("/:id(\\d+)/edit").get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;

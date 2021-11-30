import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController";
import { recommendedVideo, searchVideo } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", recommendedVideo);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/login", login);
globalRouter.get("/search", searchVideo);

export default globalRouter;

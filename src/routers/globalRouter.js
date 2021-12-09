import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { recommendedVideo, searchVideo } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", recommendedVideo);
globalRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
globalRouter.get("/search", searchVideo);

export default globalRouter;

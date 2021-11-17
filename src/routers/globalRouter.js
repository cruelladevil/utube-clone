import express from "express";
import { join } from "../controllers/userController";
import { recommendedVideo } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", recommendedVideo);
globalRouter.get("/join", join);

export default globalRouter;

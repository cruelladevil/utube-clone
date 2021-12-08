import express from "express";
import { getEditUser, postEditUser, deleteUser, logout, seeUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEditUser).post(postEditUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", logout);
userRouter.get("/:id", seeUser);

export default userRouter;

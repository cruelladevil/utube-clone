import express from "express";
import { getEditUser, postEditUser, deleteUser, logout, seeUser, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEditUser).post(avatarUpload.single("avatar"), postEditUser);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/delete", protectorMiddleware, deleteUser);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", seeUser);

export default userRouter;

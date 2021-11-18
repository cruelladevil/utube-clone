import express from "express";
import { editUser, deleteUser, logout, seeUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", logout);
userRouter.get("/:id", seeUser);

export default userRouter;

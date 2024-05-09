import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUserById);

userRouter.post('/', userController.createUser);

export default userRouter;
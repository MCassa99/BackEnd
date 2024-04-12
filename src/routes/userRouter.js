import { Router } from "express";
import { get } from "mongoose";
import { getUsers } from "../controllers/userController.js";


const userRouter = Router();

userRouter.get('/', async (req, res) => {
     try {
          const users = await getUsers();
          res.status(200).send(users);
     } catch (error) {
          res.status(500).send("Error al consultar usuarios ", error);
     }
});

userRouter.post('/', async (req, res) => {
     try {
          const {name, surname, age, email, password} = req.body;
          const newUser = await createUser(name, surname, age, email, password);
          res.status(201).send(newUser);
     } catch (error) {
          res.status(500).send("Error al crear usuario ", error);
     }
});

export default userRouter;
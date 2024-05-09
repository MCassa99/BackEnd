import User from '../dao/classes/userDao.js';

const userService = new User();

export const getUsers = async (req, res) => {
     const user = await userService.getUsers();
     res.status(200).send(user);
}

export const getUserById = async (req, res) => {
     const { id } = req.params;
     const user = await userService.getUserById(id);
     res.status(200).send(user);
}

export const createUser = async (req, res) => {
     const user = req.body;
     const newUser = await userService.createUser(user);
     res.status(200).send(newUser);
}
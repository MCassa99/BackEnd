import { userModel } from '../models/user.js'

export const getUsers = async () => {
     const users = await userModel.find();
     return users;
}

export const createUser = async (name, surname, age, email, password) => {
     const newUser = await userModel.create({name, surname, age, email, password});
     return newUser;
}
import { userModel } from '../../models/user.js';

/* Este DAO es utilizado solamente por el controlador de usuario, solo por fines didacticos, en realidad este no existiria. */

export default class User {
     getUsers = async () => {
          try {
               const users = await userModel.find();
               return users;
          } catch (error) {
               console.log("Error al obtener usuarios ", error);
               return null;
          }
     }

     getUserById = async (id) => {
          try {
               const user = await userModel.findOne({ _id: id });
               return user;
          } catch (error) {
               console.log("Error al obtener usuario por id ", error);
               return null;
          }
     }

     createUser = async (user) => {
          try {
               const newUser = new userModel(user);  // Create a new instance of the model with the provided user data
               await newUser.save();                 // Save the new user to the database
               return newUser;
          } catch (error) {
               console.log("Error al crear usuario ", error);
               return null;
          }
     }
}


import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
     /*
          1: Objeto de asoaciación del token (Usuario)
          2: Contraseña secreta
          3: Tiempo de expiración del token
     */
     const token = jwt.sign({ user }, 'coderhouse', { expiresIn: '12h' });
     return token;
};

console.log(generateToken(
     {
          "_id": "660b5029ae521ade032091c6",
          "first_name": "Matias Cassanello",
          "last_name": " ",
          "age": 18,
          "email": "mcassa1999@gmail.com",
          "password": "$2b$11$mWzu.UarmO36boICY2p.Zue7GTfgrgC8P2Uamrt/2K/6RG3rteyvG",
          "role": "User",
          "__v": 0
     }
));
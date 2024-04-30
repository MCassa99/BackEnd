import dotenv from 'dotenv';

dotenv.config();

const varenv = {
     mongodb: process.env.MONGODB_URL,
     salt: process.env.SALT,
     sessionSecret: process.env.SESSION_SECRET,
     cookieSecret: process.env.COOKIE_SECRET,
     jwtSecret: process.env.JWT_SECRET
}

export default varenv;
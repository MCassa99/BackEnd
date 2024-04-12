import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user.js";

const cookieExtractor = (req) => {
     console.log('req.cookies: ', req.cookies);
     const token = req.cookies ? req.cookies.jwtCookie : {};
     console.log('token: ', token);
     return token;
}

const jwtOptions = {
     jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), /* Extrae el token del header de la petición con Postman */
     //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), /* Extrae el token del header de la petición en el navegador */
     secretOrKey: 'coderhouse' /* Contraseña secreta para firmar el token */
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
     try {
          console.log('payload: ', payload);
          const user = await userModel.findById(payload.user._id);
          if (user) {
               return done(null, user);
          } else {
               return done(null, false);
          }
     } catch (error) {
          return done(error, null);
     }
});
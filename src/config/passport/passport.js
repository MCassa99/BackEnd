import local from 'passport-local'
import passport from 'passport'
import { userModel } from '../../models/user.js'
import { createHash, validateHash } from '../../utils/bcrypt.js'

//Configuración de passport con uno o mas Middleware

const localStrategy = local.Strategy;

const initializePassport = () => {
    //Defino las rutas que se aplican mis estrategias
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, password, age, role } = req.body;
            const findUser = await userModel.findOne({ email: email });
            if (findUser) {
                return done(null, false)
            } else {
                const user = await userModel.create({ first_name: first_name, last_name: last_name, email: email, age: age, password: createHash(password), role: role });
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }));

    //Inicializar la sesion del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    //Borrar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id).lean();
        done(null, user);
    });

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username }).lean()
            if (user && validateHash(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error)
        }
    }));
}

export default initializePassport;
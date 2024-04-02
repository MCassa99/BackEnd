import { Router } from "express";
import { userModel } from "../models/user.js";
import passport from "passport";

const sessionRouter = Router();

//Session Routes
//Obtener session
sessionRouter.get('/getSession', (req, res) => {
    res.send(req.session);
});
//Agregar session
sessionRouter.get('/login', passport.authenticate('login'), async (req, res) => {
    try {
        console.log(req.user);
        if (!req.user){
            res.status(401).send('Usuario o contraseña incorrectos');
        } else {
            req.session.user = {
                email: req.user.email,
                first_name: req.user.first_name
            }
            res.status(200).send('Logueado correctamente');
        }
    } catch (error) {
        res.status(500).send('Error al loguearse');
    }
});

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => { });

sessionRouter.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/');
});

sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user){
            res.status(400).send('Usuario o contraseña incorrectos');
        } else {
            res.status(200).send('Usuario creado correctamente');
        }
    } catch (error) {
        res.status(500).send('Error al crear usuario');
    }
});

sessionRouter.get('/logout', (req, res) => {    
    req.session.destroy((error => 
        error ? res.status(500).send('Error al cerrar la sesion') : res.status(200).redirect('/')   
    ));
});

export default sessionRouter;
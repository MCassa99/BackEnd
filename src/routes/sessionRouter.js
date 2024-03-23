import { Router } from "express";
import { userModel } from "../models/user.js";

const sessionRouter = Router();

//Session Routes
//Obtener session
sessionRouter.get('/getSession', (req, res) => {
    res.send(req.session);
});
//Agregar session
sessionRouter.get('/', (req, res) => {
    if (req.session.counter){
        req.session.counter++;
        res.send('Bienvenido nuevamente, has entrado ' + req.session.counter + ' veces al sitio');
    } else {
        req.session.counter = 1;
        res.send('Sos el primero en entrar al sitio')
    }
});

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
            if (user && user.password === password){
                req.session.email = email;
                if (user.role == 'Admin'){
                    req.session.admin = true;
                    res.status(200).send('Logueado como Admin');
                } else {
                    res.status(200).send('Logueado correctamente');
                }
            } else {
                res.status(401).send('Usuario o contraseña incorrectos');
            }
    } catch (error) {
        res.status(500).send('Error interno del servidor al loguearse' + error);
    }
});

sessionRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age, role } = req.body;
    try {
        const findUser = await userModel.findOne({ email: email })
        if (findUser){
            res.status(400).send('El usuario ya existe con este email');
        } else {
            const user = await userModel.create({ first_name, last_name, email, password, age, role });
            if (user){
                res.status(201).send('Usuario creado correctamente');
            } else {
                res.status(400).send('Faltan ingresar datos');
            }
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor al crear usuario' + error);
    }
});

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy((error => 
        error ? res.status(500).send('Error al cerrar la sesion') : res.status(200).redirect('/')   
    ));
});

export default sessionRouter;
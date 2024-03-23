import express, { Router } from 'express';
import productRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import upload from '../config/multer.js';
import { __dirname } from '../path.js';

//Config
const appRouter = Router();

//Routes
appRouter.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de E-Commerce');
});
appRouter.use('/public', express.static(__dirname + '/public'));
appRouter.use('/api/products', productRouter, express.static(__dirname + '/public'));
appRouter.use('/api/chat', chatRouter, express.static(__dirname + '/public'));
appRouter.use('/api/cart', cartRouter);
appRouter.use('/api/users', userRouter);
appRouter.use('/api/session', sessionRouter);

appRouter.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        res.status(200).send('Imagen subida con exito');
    } catch (error) {
        res.status(500).send('Error interno del servidor al subir la imagen');
    }
});

export default appRouter;
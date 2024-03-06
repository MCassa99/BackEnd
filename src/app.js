import express from 'express';
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import chatRouter from './routes/chatRouter.js';
import userRouter from './routes/userRouter.js';
import { messageModel } from './models/messages.js';
import upload from './config/multer.js';
import mongoose from 'mongoose';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

//Config
const app = express();
const PORT = 3000;

//Server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
const io = new Server(server);

//Conexión a la base de datos
mongoose.connect('mongodb+srv://mcassa99:pruebaCoderHouse@cluster0.gudv9d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
    })
    .catch((error) => {
        console.log('Error al conectarse a la base de datos: ' + error);
    });

//Middlewares
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Chat
const users = [];
//Socket io
io.on('connection', (socket) => {
    console.log('El socket se ha conectado con el id: ' + socket.id);

    socket.on('newUser', info => {
        users.push(info);
        console.log(users);
        socket.broadcast.emit('newUser', users);
        socket.emit('newUser', users);
    });

    socket.on('message', async (msg) => {
        try {
            await messageModel.create(msg);
            socket.broadcast.emit('messageLogs', msgs);
            socket.emit('messageLogs', msgs);
        } catch (error) {
            console.log('Error al enviar el mensaje: ' + error);
        }
    });
});

//Routes
app.use('/public', express.static(__dirname + '/public'));
app.use('/api/products', productRouter, express.static(__dirname + '/public'));
app.use('/api/chat', chatRouter, express.static(__dirname + '/public'));
app.use('/api/cart', cartRouter);
app.use('/api/users', userRouter);
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        res.status(200).send('Imagen subida con exito');
    } catch (error) {
        res.status(500).send('Error interno del servidor al subir la imagen');
    }
});
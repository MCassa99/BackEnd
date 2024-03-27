import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import messageModel from './models/messages.js'
import appRouter from './routes/appRouter.js';
import initializePassport from './config/passport/passport.js'
import passport from 'passport'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import  Template from 'handlebars'

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
    .then(() => { console.log('Conexión a la base de datos exitosa'); })
    .catch((error) => { console.log('Error al conectarse a la base de datos: ' + error); });

//Middlewares
app.use(express.json());

app.use(session({
    secret: 'secret0000',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://mcassa99:pruebaCoderHouse@cluster0.gudv9d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        ttl: 600, // 10 minutos
    })
}));

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser('secret0000'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Routes
app.use('/', appRouter);
/*
//Cookies Routes
//Obtener cookie
appRouter.get('/getCookie', (req, res) => {
    res.send(req.signedCookies);
});
//Agregar cookie
appRouter.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una Cokie', { maxAge: 600000, signed: true }).send('Cookie creada');
});
//Borrar cookie
appRouter.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send('Cookie eliminada');
});
*/
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

Template.registerHelper("log", function(something) {
    console.log(something);
});
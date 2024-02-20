import express from 'express';
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import upload from './config/multer.js';
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

//Middlewares
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Socket
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('new-product', (data) => { //Escuchamos el evento new-product
        console.log(data);
    });

    socket.on('delete-product', (data) => { //Escuchamos el evento new-product
        console.log(data);
        socket.emit('mensaje-usuario', 'Producto eliminado'); //Emitimos el evento mensaje-usuario al usuario que envio el producto
        socket.broadcast.emit('product-deleted', 'Se ha eliminado el producto'); //Emitimos el evento mensaje-usuario a TODOS los usuarios conectados
    });

});


//Routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', productRouter, express.static(__dirname + '/public'));
app.use('/api/cart', cartRouter);
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        res.status(200).send('Imagen subida con exito');
    } catch (error) {
        res.status(500).send('Error interno del servidor al subir la imagen');
    }
});

// app.get('/static', (req, res) => {
//     const products = [
//         { name: 'Coca Cola', price: 100, image: './images/prod_CocaCola.webp'},
//         { name: 'Pepsi', price: 150, image: './images/prod_Pepsi.png'},
//         { name: 'Sprite', price: 200, image: './images/prod_Sprite.png'},
//         { name: 'Fanta', price: 250, image: './images/prod_Fanta.webp'}            
//     ]
    
// });

import express from 'express';
import productRouter from './routes/productsRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import upload from './config/multer.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';

//Config
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


//Routes
app.use('/api/products', productRouter);
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

app.get('/static', (req, res) => {
    const products = [
        { name: 'Coca Cola', price: 100, image: './images/prod_CocaCola.webp'},
        { name: 'Pepsi', price: 150, image: './images/prod_Pepsi.png'},
        { name: 'Sprite', price: 200, image: './images/prod_Sprite.png'},
        { name: 'Fanta', price: 250, image: './images/prod_Fanta.webp'}            
    ]
    res.render('templates/products', {
        mostrarProductos: true,
        productos: products,
        css: 'products.css'
    });
});

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



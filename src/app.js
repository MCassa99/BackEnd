import express from 'express';
import productRouter from './routes/productsRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import upload from './config/multer.js';
import { __dirname } from './path.js';

//Config
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

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

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



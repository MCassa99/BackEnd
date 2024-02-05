import express from 'express';
import { ProductManager } from './config/ProductManager.js';

const app = express();
const PORT = 3000;
const productManager = new ProductManager('./src/data/products.json');

app.get('/', (req, res) => {
    res.send('Este es mi proyecto de Backend de CoderHouse');
})

app.get('/productos', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    // Consulto si hay un limite en la cantidad de productos a mostrar
    if (limit){
        if (parseInt(limit) && parseInt(limit) > 0) {
            // Deberia devolver 'Listado de productos: ' + products.slice(0, limit)
            res.send(products.slice(0, limit));
            console.log(products.slice(0, limit));
        } else {
            res.send('Ingrese un limite valido!')
        }
    } else {
        // Deberia devolver 'Listado de productos: ' + products
        res.send(products);
        console.log(products);
    }
})

app.get('/productos/:id', async (req, res) => {
    const idProuducto = req.params.id;
    const product = await productManager.getProductById(idProuducto);
    if (product){
        // Deberia devolver 'Producto solicitado con id: ' + idProuducto + '\nEs: ' + product
        res.send(product);
        console.log(product);
    } else {
        res.send('El producto no existe');
        console.log('Product not found')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



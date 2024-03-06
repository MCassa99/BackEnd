import { Router } from 'express';
//import { CartManager } from '../config/cartManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
import cartModel from '../models/cart.js'; 

//const cartManager = new CartManager('./src/data/cart.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        const createCart = await cartModel.create({products: []});
        res.status(201).send(createCart);
    } catch (error) {
        res.status(500).send('Error al crear carrito ', error);
    }
});

//Listar todos los productos
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartID = req.params.id;
        const cart = await cartModel.findById(cartID);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send('Error interno del servidor al mostrar el carrito');
    }
});

//Agregar un producto al carrito
cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const { quantity } = req.body;
        const cart = await cartModel.findById(cartID);
        //Me fijo si el producto ya esta en el carrito
        const index = cart.products.findIndex(product => product.id_prod == productID);
        if (index !== -1) {
            //Si cambio aca el = por +=, me suma la cantidad en vez de reemplazarla
            cart.products[index].quantity = quantity;
        } else {
            cart.products.push({ id_prod: productID, quantity });
        }
        const status = await cartModel.findByIdAndUpdate(cartID, cart);
        return res.status(200).send(status);
    } catch (error) {
        return res.status(500).send('Error interno del servidor al agregar el producto' + error);
    }
});

//SE AGREGARON A PARTE DE LO PEDIDO ESTOS 2 ENDPOINTS
//Eliminar un producto del carrito
cartRouter.delete('/:id', async (req, res) => {
    try {
        const productID = req.params.id;
        const status = await cartModel.findByIdAndDelete(productID);
        return res.status(status).send("Producto eliminado del carrito con exito");
    } catch (error) {
        return res.status(500).send('Error interno del servidor al eliminar el producto' + error);
    }
});

//Vaciar carrito
cartRouter.delete('/', async (req, res) => {
    try {
        const status = await cartModel.deleteMany();
        return res.status(status).send(validateStatus(status, 'vaciar'));
    } catch (error) {
        return res.status(500).send('Error interno del servidor al vaciar el carrito');
    }
});


export default cartRouter;
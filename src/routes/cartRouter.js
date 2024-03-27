import { Router } from 'express';
//import { CartManager } from '../config/cartManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
import cartModel from '../models/cart.js'; 

//const cartManager = new CartManager('./src/data/cart.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const cartRouter = Router();

//Crear un carrito
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
        const cartID = req.params.cid;
        const cart = await cartModel.findById(cartID);
        const productsCart =  cart.products.map(product => product.id_prod.toJSON());
        return res.status(200).render('templates/cart', {
            mostrarCarrito: true,
            products: productsCart,
            css: 'cart.css'
        });
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
        // Si el producto ya existe en el carrito, se incrementa la cantidad
        const index = cart.products.findIndex(product => product.id_prod._id == productID);
        if (index != -1) {
            cart.products[index].quantity += quantity;
        }
        // Si no existe, se agrega al carrito
        else {
            cart.products.push({id_prod: productID, quantity: quantity});
        }
        await cartModel.findByIdAndUpdate(cartID, cart);
        const status = await cartModel.findById(cartID);
        res.status(200).send(status);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor al agregar el producto' + error);
    }
});

//SE AGREGARON A PARTE DE LO PEDIDO ESTOS 2 ENDPOINTS
//Eliminar un producto del carrito
cartRouter.delete('/:cid/:pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const cart = await cartModel.findById(cartID);
        const index = cart.products.findIndex(product => product.id_prod._id == productID);
        if (index != -1) {
            cart.products.splice(index, 1);
        }
        const status = await cartModel.findByIdAndUpdate(cartID, cart);
        return res.status(200).send(status);
    } catch (error) {
        return res.status(500).send('Error interno del servidor al eliminar el producto' + error);
    }
});

//Vaciar carrito
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        await cartModel.findByIdAndDelete(cartID);
        return res.status(200).send("Carrito vaciado con exito");
    } catch (error) {
        return res.status(500).send('Error interno del servidor al vaciar el carrito' + error);
    }
});

export default cartRouter;
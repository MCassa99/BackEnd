import { Router } from 'express';
//import { CartManager } from '../config/cartManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
import { cartModel } from '../models/cart.js'; 
import { createCart, getCartById, addProductToCart } from '../controllers/cartController.js';

//const cartManager = new CartManager('./src/data/cart.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const cartRouter = Router();

//Crear un carrito
cartRouter.post('/', async (req, res) => {
    try {
        const createdCart = await createCart();
        res.status(201).send(createdCart);
    } catch (error) {
        res.status(500).send('Error al crear carrito ', error);
    }
});

//Listar todos los productos
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productsCart = await getCartById(cartID);
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
cartRouter.post('/:cid/: pid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const { quantity } = req.body;
        const newCart = await addProductToCart(cartID, productID, quantity);
        res.status(200).send(newCart);
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
        const deletedCart = await deleteProductFromCart(cartID, productID);
        return res.status(200).send(deletedCart);
    } catch (error) {
        return res.status(500).send('Error interno del servidor al eliminar el producto' + error);
    }
});

//Vaciar carrito
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cartID = req.params.cid;
        await deleteCart(cartID);
        return res.status(200).send("Carrito vaciado con exito");
    } catch (error) {
        return res.status(500).send('Error interno del servidor al vaciar el carrito' + error);
    }
});

export default cartRouter;
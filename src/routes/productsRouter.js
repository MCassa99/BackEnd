import { Router } from "express";
import { getProducts, getProductById, createProduct, deleteProduct } from "../controllers/productController.js";
//import { ProductManager } from '../config/productManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */

//const productManager = new ProductManager('./src/data/products.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const productRouter = Router();

//Listar todos los productos
productRouter.get('/', async (req, res) => {
    try {
        const { limit, page, filter, sort } = req.query;
        const products = await getProducts(limit, page, filter, sort);
        //Quito el .send(products) y agrego el render ya que no se puede enviar dos respuestas
        res.status(200).render('templates/home', {
            mostrarProductos: true,
            productos: products,
            css: 'home.css'
        });
            
    } catch (error) {
        res.status(500).send('Error interno del servidor al listar los productos' + error).render('templates/error', {
            error: error
        });;
    }
})

//Buscar un producto por ID
productRouter.get('/:id', async (req, res) => {
    try {
        const idProuducto = req.params.id;
        const product = await getProductById(idProuducto);
        if (product)
            // Deberia devolver 'Producto solicitado con id: ' + idProuducto + '\nEs: ' + product
            res.status(200).send(product);
        else
            res.status(404).send("El producto no existe");
    } catch (error) {
        res.status(500).send('Error interno del servidor al buscar el producto' + error);
    }
})

//Agregar un producto
productRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        const createdProduct = await createProduct(product);
        res.status(201).send("Producto creado con exito", createdProduct);
    } catch (error) {
        res.status(500).send("Error al crear producto" + error);
    }
})

//Modificar un producto
productRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = req.body;
        const updatedProduct = await updateProduct(id, updateProduct);
        res.status(200).send("Producto modificado con exito", updatedProduct);
    } catch (error) {
        res.status(500).send("Error al modificar Producto" + error);
    }
})

//Eliminar un producto
productRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await deleteProduct(id);
        res.status(200).send("Producto eliminado con exito", deletedProduct);
    } catch (error) {
        res.status(500).send("Error al eliminar producto" + error);
    }
})

export default productRouter;
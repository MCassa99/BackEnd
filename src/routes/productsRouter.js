import { Router } from "express";
import { productModel } from "../models/product.js";
//import { ProductManager } from '../config/productManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */

//const productManager = new ProductManager('./src/data/products.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const productRouter = Router();

//Listar todos los productos
productRouter.get('/', async (req, res) => {
    try {
        let letFilter;
        const { limit, page, filter, sort } = req.query;
        const actualPage = page != undefined ? page : 1;
        const limitPerPage = limit != undefined ? limit : 10;

        // Consulto si hay un filtro
        if (filter == 'true' || filter == 'false') {
            letFilter = 'status';
        } else {
            if (filter != undefined){
                letFilter = 'category';
            }
        }

        const query = letFilter ? { [letFilter]: filter } : { };
        const sortType = sort != undefined ? {price : sort} : { };

        // Consulto los productos con el filtro y paginacion
        const products = await productModel.paginate(query, {limit: limitPerPage, page: actualPage, sort: sortType});
        const productsJSON = products.docs.map(product => product.toJSON());
        // Deberia devolver 'Listado de productos: ' + products.slice(0, limit)
        //Quito el .send(products) y agrego el render ya que no se puede enviar dos respuestas
        res.status(200).render('templates/home', {
            mostrarProductos: true,
            productos: productsJSON,
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
        const product = await productModel.findById(idProuducto);
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
        const status = await productModel.create(product);
        //Simplificar el mensaje de error
        res.status(201).send("Producto creado con exito");
    } catch (error) {
        res.status(500).send("Error al crear producto" + error);
    }
})

//Modificar un producto
productRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = req.body;
        const status = await productModel.findByIdAndUpdate(id, updateProduct).lean();
        //Simplificar el mensaje de error
        res.status(200).send("Producto modificado con exito");
    } catch (error) {
        res.status(500).send("Error al modificar Producto" + error);
    }
})

//Eliminar un producto
productRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const status = await productModel.findByIdAndDelete(id);
        //Simplificar el mensaje de error
        res.status(200).send("Producto eliminado con exito");
    } catch (error) {
        res.status(500).send("Error al eliminar producto" + error);
    }
})

export default productRouter;
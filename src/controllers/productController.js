import { productModel } from '../models/product.js';

export const getProducts = async (limit, page, filter, sort) => {
     let letFilter;
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

     return productsJSON;
}

export const getProductById = async (id) => {
     const product = await productModel.findById(idProuducto);
     return product;
}

export const createProduct = async (product) => {
     const status = await productModel.create(product);
     return status;
}

export const updateProduct = async (id, updateProduct) => {
     const status = await productModel.findByIdAndUpdate(id, updateProduct).lean();
     return status;
}

export const deleteProduct = async (id) => {
     const status = await productModel.findByIdAndDelete(id);
     return status;
}
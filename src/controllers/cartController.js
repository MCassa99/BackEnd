import e from 'express';
import { cartModel } from '../models/cart.js';

export const createCart = async () => {
     const createCart = await cartModel.create({ products: [] });
     return createCart;
}

export const getCartById = async (id) => {
     const cart = await cartModel.findById(id);
     const productsCart = cart.products.map(product => product.id_prod.toJSON());
     return productsCart;
}

export const addProductToCart = async (cartID, productID, quantity) => {
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
     const newCart = await cartModel.findById(cartID);
     return newCart;
}

export const deleteProductFromCart = async (cartID, productID) => {
     const cart = await cartModel.findById(cartID);
     const index = cart.products.findIndex(product => product.id_prod._id == productID);
     if (index != -1) {
          cart.products.splice(index, 1);
     }
     const deletedCart = await cartModel.findByIdAndUpdate(cartID, cart);
     return deletedCart;
}

export const deleteCart = async (id) => {
     const deletedFullCart = await cartModel.findByIdAndDelete(cartID);
     return deletedFullCart;
}
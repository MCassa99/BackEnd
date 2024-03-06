import { Schema, model } from 'mongoose';

const productSchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     thumbnail: {
          default:[]
     },
     code: {
          type: String,
          unique: true
     },
     stock: {
          type: Number,
          required: true
     },
     //status: Boolean,
     image: {
          type: String,
     }
});

export const productModel = model('Product', productSchema);
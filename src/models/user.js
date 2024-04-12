import { Schema, model } from 'mongoose';
import { cartModel } from './cart.js';

const userSchema = new Schema({
     first_name: {
          type: String,
          required: true
     },
     last_name: {
          type: String,
          required: true
     },
     age: {
          type: Number,
          required: true
     },
     email: {
          type: String,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          default: 'User'
     },
     cart_id: {
          type: Schema.Types.ObjectId,
          ref: 'Cart'
     }
});

//Create cart for user
userSchema.pre('save', async function (next) {
     try {
          const newCart = await cartModel.create({ products: [] });
          this.cart_id = newCart._id;
     } catch (error) {
          next(error);
     }
});

userSchema.pre('find', async function(next) {
     try {
          const products = await cartModel.findOne({ _id: this.cart_id });
          this.populate('cart_id');
     } catch (error) {
          next(error)
     }
});

export const userModel = model('User', userSchema);
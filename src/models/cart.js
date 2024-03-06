import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
     products: {
          type:[ {
               id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
               },
               quantity: {
                    type: Number,
                    required: true
               }
          }],
          default: []
     }   
});

const cartModel = model('Cart', cartSchema);

export default cartModel;
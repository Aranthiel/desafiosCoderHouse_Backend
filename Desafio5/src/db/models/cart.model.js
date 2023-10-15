import {Schema, model} from "mongoose";
//crear esquema
const cartSchema = new Schema({
    products:{
        type: Array
    },
});


//crear modelo
export const cartModel = model('Carritos', cartSchema);
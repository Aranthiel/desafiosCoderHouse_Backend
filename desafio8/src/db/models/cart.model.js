import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


// Crear esquema
const cartSchema = new Schema({
    products: [
        {
            productoId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Producto', // Nombre de la colección a la que haces referencia
                // en products.model.js: export const productModel = model('Producto', productSchema);
            },
            quantity: {
                type:Number,
            },
            _id:false,
        },
    ],
});

cartSchema.plugin(mongoosePaginate);

// Crear modelo
export const cartModel = model('Carritos', cartSchema);

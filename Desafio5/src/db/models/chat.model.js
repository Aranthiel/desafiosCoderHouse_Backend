import {Schema, model} from "mongoose";
//crear esquema
const chatSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    messaje:{
        type: String,
        required:true
    }
});


//crear modelo
export const cartModel = model('Chat', chatSchema);
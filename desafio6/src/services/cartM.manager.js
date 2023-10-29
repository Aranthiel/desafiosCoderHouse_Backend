import { cartModel } from '../db/models/cart.model.js';

class CartManagerMongoose{
    
    async mongooseGetAllCarts(){
        console.log('ejecutando mongooseGetAllCarts en cartM.manager.js');
        const response = await cartModel.find()
        return response;
    }

    //obj={user:"Fulanito"}
    async mongooseFindOneCart(obj){
        console.log('ejecutando mongooseFindOneCart en cartM.manager.js');
        const response= await cartModel.findOne(obj);
        return response;
    }

    async mongooseGetCartById(cid){
        console.log('ejecutando mongooseGetCartById en cartM.manager.js');
        const response = await cartModel.findById(cid);
        return response;
    };

    async mongooseAddCart(obj){
        console.log('ejecutando mongooseAddCart en cartM.manager.js');
        const response = await cartModel.create(obj)
        return response;
    };


    async mongooseUpdateCart(cid, obj){
        console.log('ejecutando mongooseUpdateCart en cartM.manager.js');
        const response = await cartModel.updateOne({ _id: cid }, { $set: obj });
        return response;
    };
    
    async mongooseDeleteCart(cid){
        console.log('ejecutando mongooseDeleteCart en cartM.manager.js');
        const response = await cartModel.findByIdAndDelete(cid);
        return response;
    }; 
}

export const cartManagerMongoose = new CartManagerMongoose();

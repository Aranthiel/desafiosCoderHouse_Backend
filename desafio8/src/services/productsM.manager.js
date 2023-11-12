import { productModel } from '../db/models/products.model.js';

//funciona perfecto, no tocar 29/10/2023 2:00am
export class ProductsManagerMongoose{   

    async mongooseGetProducts(limit){
        console.log('ejecutando mongooseGetProducts en productsM.manager.js')
        limit ? limit : 15;
        const productsList = await productModel.find().limit(limit);
        console.log('productsList en mongooseGetProducts', productsList)
        return productsList;
    }
        
    async mongooseGetProductById(pid){
        console.log('ejecutando mongooseGetProductById en productsM.manager.js')
        try {
            const product = await productModel.findById(pid);            
            
            if(!product){
                //return `ERROR:NOT FOUND. El producto ${productId} NO se encuentra en el listado de productos, por favor ingrese un producto válido`;
                console.log(`ERROR:NOT FOUND. El producto ${pid} NO se encuentra en el listado de productos, por favor ingrese un producto válido`);
                return null; // Devuelve null en lugar de una cadena de error
        
            } else {
                return product;
            };
            
        } catch (error) {
            return error
        }
    };    
    
    async mongooseAddProduct(obj){
        console.log('ejecutando mongooseAddProduct en productsM.manager.js')
        try {
            const newProduct= await productModel.create(obj);  // zoom  1:20hs ver video desde ahi          
            return newProduct;
        } catch (error) {
            return error
        }
    };
    
    async mongooseUpdateProduct(pid, obj){
        console.log('ejecutando mongooseUpdateProduct en productsM.manager.js')        
        try {
            // Buscar el producto a actualizar por su ID
            let response = await productModel.updateOne({ _id: pid },obj);
            console.log( 'product en mongooseUpdateProduct', response)

            if (!response) {
                // Producto no encontrado, devuelve null
                return null;
            }
            // Retorna el producto actualizado
            return product;
    
        } catch (error) {
            return error;
        }
    };
        
    async mongooseDeleteProduct(pid){
        console.log('ejecutando mongooseDeleteProduct en productsM.manager.js')
            const product = await productModel.findByIdAndDelete(pid);
            return product;
    };
};

export const productsManagerMongoose= new ProductsManagerMongoose();//modificado despues de  29/10/2023 2:00am pero funciona

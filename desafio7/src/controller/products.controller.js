import { productsManagerMongoose } from '../services/productsM.manager.js';

//funciona perfecto, no tocar 29/10/2023 2:00am

//funcion intermedia entre router y manager metodo GET para obtener TODOS LOS PRODUCTOS
async function getAllProductsC(req, res){
    console.log('ejecutando getAllProductsC en products.controller.js')
    const limit = req.query.limit ? req.query.limit : undefined;

    try {
        const products = await productsManagerMongoose.mongooseGetProducts(limit);
        if (!products.length) {
            res.status(404).json({ success: false, message: 'No se encontraon productos'})        
        } else {
            res.status(200).json({success: true, message: 'Productos encontrado:', products})
            return products;
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//funcion intermedia entre router y manager metodo GET para obtener un PRODUCTO POR SU ID
async function getProductByIdC (req, res){
    console.log('ejecutando getProductByIdC en products.controller.js')
    const {pid}=req.params;    
        
    try {        
        const productById = await productsManagerMongoose.mongooseGetProductById(pid);
        if (productById){
            console.log(pid);
            res.status(200).json({success: true, message: 'Producto encontrado:', productById})
            return productById;
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'})
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 

//funcion intermedia entre router y manager metodo POST para APGREGAR PRODUCTO
async function addProductC (req, res){
    console.log('ejecutando addProductC en products.controller.js')   
    const nuevoProducto= req.body
    console.log('nuevoProducto en products.controlles.js: ', nuevoProducto)
    try {
        const productoAgregado = await productsManagerMongoose.mongooseAddProduct(nuevoProducto);
        if (productoAgregado){
            res.status(200).json({success: true, message: 'Producto agregado:', productoAgregado});
            return productoAgregado; 
        } else {
            res.status(404).json({ success: false, message: 'No se pudo agregar el producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    
    
}; 

//funcion intermedia entre router y manager metodo PUT para actualizar un producto por su ID
async function updateProductC (req , res){
    console.log('ejecutando updateProductC en products.controller.js')    
    const {pid}=req.params;
    const newValues= req.body;
    try {
        const response = await productsManagerMongoose.mongooseUpdateProduct(pid, newValues);
        console.log(response);
        if(response != null){
            res.status(200).json({success: true, message: 'Producto actualizado:', response});
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//funcion intermedia entre router y manager metodo DELETE para eliminar un producto por su ID
async function deleteProductC(req , res){
    console.log('ejecutando deleteProductC en products.controller.js')
    const {pid}=req.params;
    try {
        const deletedProduct = await productsManagerMongoose.mongooseDeleteProduct(pid);
        if (deletedProduct) {
            res.status(200).json({success: true, message: 'Producto eliminado con exito:', deletedProduct});
            return deletedProduct; 
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export {
    getAllProductsC,
    getProductByIdC,
    addProductC,
    updateProductC,
    deleteProductC,
    }

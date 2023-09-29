
// con HTTP
//const http = require('http') solo dunciona si en el package.json no esta "type"
/* import {  http } from "http";
const server=http.createServer();
server.listen(8080,()=>{
    console,log(`Escuchando al puerto 8080 con http`)
}) */

/// EXPRESS
//const express= require('express);
import express from 'express'
import { productManagerN } from './ProductManager.js';

const app = express();
const port=8080;

//Middleware para que Express pueda analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//endpopint GET para obtener TODOS LOS PRODUCTOS
app.get('/products', async (req, res)=>{
    try {
        const products = await productManagerN.getProducts();
        if (!products.length){
            res.status(200).json({message: 'No se encontraron productos'})
        } else {
            res.status(200).json({message: 'Productos encontrados', products})
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}); 

//endpopint GET para obtener un PRODUCTO POR SU ID
app.get('/products/:productId', async (req, res)=>{
    const {productId}=req.params;
    try {        
        const productById = await productManagerN.getProductById(+productId);
        if (productById){
            res.status(200).json({message: 'Producto encontrado:', productById})
        } else {
            res.status(200).json({message: 'No se encontro el Id de producto solicitado'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

//Endpoint POST para APGREGAR PRODUCTO
app.post('/products', async (req, res)=>{
    console.log(req.body)
    const nuevoProducto=req.body;

    // Validar que todos los campos sean obligatorios
    if (!nuevoProducto.title || !nuevoProducto.description || !nuevoProducto.price || !nuevoProducto.thumbnail || !nuevoProducto.code || !nuevoProducto.stock) {
        res.status(400).json({ message: 'Todos los campos son obligatorios. No se pudo agregar el producto.' });
        return;
    }

    try {
        const productoAgregado = await productManagerN.addProduct(nuevoProducto)
        res.status(201).json({message: 'Producto agregado:', product: productoAgregado})
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}); 

//Endpoint PUT para actualizar un producto por su ID
app.put('/products/:productId', async (req , res) =>{    
    const {productId}=req.params;
    const newValues= req.body;
    try {
        const response = await productManagerN.updateProduct(+productId, newValues)
        if (response) {
            res.status(200).json({ message: 'Producto actualizado con éxito', product: response});
        } else {
            res.status(404).json({ message: 'No se encontró el producto con el ID proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

//Endpoint DELETE para eliminar un producto por su ID
app.delete('/products/:productId', async (req , res) =>{
    const {productId}=req.params;
    try {
        const response = await productManagerN.deleteProduct(+productId)
        if (response===true) {
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'No se encontró el producto con el ID proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Inicia el servidor
app.listen(port, ()=>(
    console.log(`Pruebas server express. Servidor escuchando en http://localhost:${port}`)
));


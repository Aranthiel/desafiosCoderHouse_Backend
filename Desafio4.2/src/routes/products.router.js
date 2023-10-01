import {Router} from "express";
import { getAllProductsC,
        getProductByIdC,
        addProductC,
        updateProductC,
        deleteProductC,} from '../controller/products.controller.js'


const router = Router();

//endpopint GET para obtener TODOS LOS PRODUCTOS
router.get('/', getAllProductsC)
//endpopint GET para obtener un PRODUCTO POR SU ID
router.get('/:pid', getProductByIdC)
//Endpoint POST para APGREGAR PRODUCTO
router.post('/', addProductC)
//Endpoint PUT para actualizar un producto por su ID
router.put('/:pid', updateProductC)
//Endpoint DELETE para eliminar un producto por su ID
router.delete('/:pid',deleteProductC)

export default router
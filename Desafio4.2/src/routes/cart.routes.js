import {Router} from "express";
import { 
    getCartByIdC,
    addCartC,
    addProductToCartC
} from '../controller/cart.controller.js'

//este archivo no está en uso 

const router = Router();

//endpopint GET para obtener TODOS LOS PRODUCTOS
router.get('/:cid', getCartByIdC)
//endpopint GET para obtener un PRODUCTO POR SU ID
router.post('/', addCartC)
//Endpoint POST para APGREGAR PRODUCTO
router.post('/:cid/product/:pid', addProductToCartC)

export default router
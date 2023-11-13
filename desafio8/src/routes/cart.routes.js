import {Router} from "express";
import { 
    getCartByIdC,
    addCartC,
    addProductToCartC,
    getAllCartsC
} from '../controller/cart.controller.js'

//este archivo no está en uso 

const cartsRouter = Router();

cartsRouter.get('/', getAllCartsC)
cartsRouter.get('/:cid', getCartByIdC)
cartsRouter.post('/', addCartC)
cartsRouter.post('/:cid/product/:pid', addProductToCartC)

export default cartsRouter
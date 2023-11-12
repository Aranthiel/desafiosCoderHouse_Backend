import { cartModel } from '../db/models/cart.model.js';
import BasicManager from './basic.manager.js';

class CartsBManager extends BasicManager{
    constructor () {
        super(cartModel, "Producto");

    }
}

export const cartsBManager = new CartsBManager();
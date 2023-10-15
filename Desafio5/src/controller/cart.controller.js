import { cartManagerMongoose } from "../services/cartM.manager.js";

// este archivo no está



async function getCartByIdC(req, res){
    const {cid}=req.params;
    console.log(`Tipo de productId en routes: ${typeof cid}, Valor de productId: ${cid}`);
    
    try {
        const cartById= await cartManagerMongoose.mongooseGetCartById(cid)
        if(cartById !== null){
            res.status(200).json({message: 'Carrito encontrado:', cartById})
        }  else {
            res.status(404).json({message: `No se encontro el carrito con el id ${+cid}`})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


async function addCartC(req, res){
    
    try {
        const {products} = req.body;
        console.log(products);
        if (products.length){
            const nuevoCarrito= await cartManagerMongoose.mongooseAddCart(products);
            res.status(201).json({message: `Carrito creado con exito con id: ${nuevoCarrito.id}`, nuevoCarrito})
        } else { 
            res.status(400).json({message:'Carrito vacìo'})
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


async function addProductToCartC(req, res){
    
    const { cid, pid } = req.params;
    console.log(` en routes cartId:${cid} productId: ${pid}`);
    const { quantity } = req.body; 
    if (typeof quantity !== 'number' || isNaN(quantity)) {
        quantity = 1;       
    }

    const obj = {
        pid: pid,
        quantity: quantity
    }

    try {
        const updatedCart = await cartManagerMongoose.mongooseUpdateCart(+cid, obj);
        if(updatedCart){
            res.status(200).json({ message: 'Producto agregado al carrito con éxito', updatedCart });
        } else {
            res.status(400).json({message:`No se encontro el carrito con el id ${cid}`})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}; 


export {
    getCartByIdC,
    addCartC,
    addProductToCartC
    } 
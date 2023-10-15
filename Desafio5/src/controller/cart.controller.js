import { cartManagerMongoose } from "../services/cartM.manager.js";

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


async function addCartC(req, res) {
    try {
        const { products } = req.body;
        if (products && Array.isArray(products)) {
            const nuevoCarrito = await cartManagerMongoose.mongooseAddCart({ products: products });
            res.status(201).json({ message: `Carrito creado con éxito con id: ${nuevoCarrito._id}`, nuevoCarrito });
        } else {
            res.status(400).json({ message: 'Carrito vacío o datos incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



async function addProductToCartC(req, res) {
    const { cid, pid } = req.params;
    console.log(`En routes: cartId: ${cid}, productId: ${pid}`);
    const { quantity } = req.body;

    try {
        // Obtén el carrito existente por su ID
        const existingCart = await cartManagerMongoose.mongooseGetCartById(cid);

        if (existingCart) {
            // Verifica si el producto ya está en el carrito
            const existingProduct = existingCart.products.find((product) => product.productoId.toString() === pid);

            if (existingProduct) {
                // Si el producto ya existe en el carrito, actualiza la cantidad
                existingProduct.cantidad += quantity;
            } else {
                // Si el producto no está en el carrito, agrégalo con la cantidad
                existingCart.products.push({ productoId: pid, cantidad: quantity });
            }

            // Guarda el carrito actualizado
            const updatedCart = await cartManagerMongoose.mongooseUpdateCart(cid, existingCart);

            res.status(200).json({ message: 'Producto agregado al carrito con éxito', updatedCart });
        } else {
            res.status(404).json({ message: `No se encontró el carrito con el ID ${cid}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export {
    getCartByIdC,
    addCartC,
    addProductToCartC
    } 
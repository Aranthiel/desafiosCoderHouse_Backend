import { productsManager } from '../services/productsFS.manager.js';

async function getHomeViewC(req, res){
    console.log("req", req);
    const { email, first_name } = req.session || {email: 'no se ha definido', first_name: 'Usuario desconocido'};
    res.render("home", { email, first_name });

}
async function getChatPageC (req, res)  {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    console.log(`Tipo de limit: ${typeof limit}, Valor: ${limit}`);   

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos'})
        } else {
            //res.status(200).render("home", {products});
            //res.render("home", {products});
            res.render("chat");
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 

async function getHomeProductsC (req, res)  {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    console.log(`Tipo de limit: ${typeof limit}, Valor: ${limit}`);   

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos'})
        } else {
            res.status(200).render("productsFS", {products});
            //res.render("home", {products});
           // res.render("chat");
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 

async function getRealTimeProductsC (req, res)  {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    console.log(`Tipo de limit: ${typeof limit}, Valor: ${limit}`);   

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos'})
        } else {
            res.status(200).render("realTimeProducts", {products});
            //res.render("home", {products})
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 



export {
    getHomeViewC,
    getChatPageC, 
    getHomeProductsC,
    getRealTimeProductsC
    }
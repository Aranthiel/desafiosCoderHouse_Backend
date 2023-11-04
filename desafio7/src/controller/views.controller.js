import { productsManager } from '../services/fsmanagers/productsFS.manager.js';

function getEmailAndFirstNameFromSession(req) { //funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getEmailAndFirstNameFromSession en views.controller.js');
    console.log('req.session', req.session);

    // Verificamos si req.session existe y tiene las propiedades email y first_name
    if (req.session && req.session.email && req.session.first_name) {
        return {
            email: req.session.email,
            first_name: req.session.first_name
        };
    } else {
        // Si no existen, asignamos valores por defecto
        return {
            email: 'nopusomail@mail.com',
            first_name: 'usuario desconocido'
        };
    }
}



async function getHomeViewC(req, res){//funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getHomeViewC en views.controller.js');    
    const { email, first_name } = getEmailAndFirstNameFromSession(req);
    res.render("home", { email, first_name });
};

async function getRegisterViewC(req, res){//no se si funciona  29/10/2023 2:45am
    console.log('ejecutando getRegisterViewC en views.controller.js');       
    res.render("signup");
};

async function getChatPageC (req, res){//funciona perfecto, no tocar 29/10/2023 2:00am
    console.log('ejecutando getChatPageC en views.controller.js');
    res.render("chat");
}; 

async function getHomeProductsC (req, res)  {//funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getHomeProductsC en views.controller.js');
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    
    const { email, first_name } = getEmailAndFirstNameFromSession(req);

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos'})
        } else {
            res.status(200).render("productsFS", {products, email, first_name});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 

async function getRealTimeProductsC (req, res)  {//funciona perfecto, no tocar 29/10/2023 2:00am
    console.log('ejecutando getRealTimeProductsC en views.controller.js');
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos'})
        } else {
            res.status(200).render("realTimeProducts", { products});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 



export {
    getHomeViewC,
    getChatPageC, 
    getHomeProductsC,
    getRealTimeProductsC,
    getRegisterViewC
    }
import { productsManager } from '../services/fsmanagers/productsFS.manager.js';
import { productsManagerMongoose }from '../services/productsM.manager.js'
import { userManagerMongoose } from '../services/usersM.manager.js';
import { cartManagerMongoose } from '../services/cartM.manager.js';


function getuserIdFromSession(req) { // ¿funciona? verificar 4/11
    console.log('ejecutando getuserIdFromSession en views.controller.js');    
    const userId= req.session.passport.user
    console.log('req.session.passport.user', userId )
    return userId;
};
async function getUserInfoById(id){
    console.log('ejecutando getUserInfoById en views.controller.js'); 
    const userInfo = await userManagerMongoose.getUserById(id);
    console.log('userInfo', userInfo); 
    return userInfo;
}
function getEmailAndFirstNameFromSession(req) { // ¿funciona? verificar 4/11
    console.log('ejecutando getEmailAndFirstNameFromSession en views.controller.js');
    const userId = getuserIdFromSession(req);
    const userInfo = getUserInfoById(userId)

    // Verificamos si req.session existe y tiene las propiedades email y first_name
    if (userInfo) {
        console.log('email', userInfo.email);
        console.log('first_name', userInfo.first_name);
        return {
            email: userInfo.email,
            first_name: userInfo.first_name
        };
    } else {
        // Si no existen, asignamos valores por defecto
        console.log('eroor en getEmailAndFirstNameFromSession');
        return {
            email: 'nopusomail@mail.com',
            first_name: 'usuario desconocido'
        };
    }
}

function getEmailAndFirstNameFromSessionOriginal(req) { // ¿funciona? verificar 4/11
    console.log('ejecutando getEmailAndFirstNameFromSession en views.controller.js');

    // Verificamos si req.session existe y tiene las propiedades email y first_name
    if (req.session && req.session.email && req.session.first_name) {
        console.log('req.session', req.session);
        return {
            email: req.session.email,
            first_name: req.session.first_name
        };
    } else {
        // Si no existen, asignamos valores por defecto
        console.log('req.session', req.session);
        return {
            email: 'nopusomail@mail.com',
            first_name: 'usuario desconocido'
        };
    }
}

async function getHomeViewC(req, res){//funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getHomeViewC en views.controller.js');    
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

async function getHomeProductsFSC (req, res)  {//funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getHomeProductsC en views.controller.js');
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    
    const { email, first_name } = getEmailAndFirstNameFromSession(req);

    try {
        const products = await productsManager.getProducts(+limit);
        if (!products.length){
            res.status(200).render("productsFS", { message: 'No se encontraron productos', email, first_name });
        } else {
            res.status(200).render("productsFS", {products, email, first_name});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 

async function getHomeProductsC (req, res)  {//funciona perfecto, no tocar 29/10/2023 2:45am
    console.log('ejecutando getHomeProductsC en views.controller.js');    
    
    const { email, first_name } = req.session;
    console.log(`getHomeViewC en views.controller.js email: ${email}, first_name: ${first_name}` )
    
    try {
        res.status(200).render("productsFS", {email, first_name});
        }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function getRealTimeProductsC (req, res)  {//funciona perfecto, no tocar 29/10/2023 2:00am
    console.log('ejecutando getRealTimeProductsC en views.controller.js');
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;    
    

    try {
        const products = await productsManagerMongoose.mongooseGetProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos' , data:[]})
        } else {
            res.status(200).render("realTimeProducts", { products});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}; 
async function getErrorPageC(req, res) {
    res.status(200).render("error");
}

async function getCartsViewC(req, res){
    console.log('ejecutando getCartsViewC en views.controller.js');    

    try {
        const allCarts= await cartManagerMongoose.mongooseGetAllCarts()
        if(!allCarts.length){
            res.status(404).json({ success: false, message: 'No se encontraron carritos'}) 
        }  else {
            res.status(200).render("carts", {allCarts})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export {
    getHomeViewC,
    getChatPageC, 
    getHomeProductsC,
    getRealTimeProductsC,
    getHomeProductsFSC,
    getRegisterViewC, 
    getErrorPageC,
    getCartsViewC
    }
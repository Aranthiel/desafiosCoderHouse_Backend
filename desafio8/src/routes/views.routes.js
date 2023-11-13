import {Router} from "express";
import { 
    getHomeViewC,
    getChatPageC, 
    getHomeProductsC,
    getRealTimeProductsC,
    getRegisterViewC,
    getErrorPageC,
    getCartsViewC
} from '../controller/views.controller.js';




// corregir usando views,router del proyecto que me paso cristian y pasando la logica a views.controller.js

const viewsRouter = Router();
viewsRouter.get("/", (req, res) => {
    console.log('viewsRouter.get "/"');
    res.render("login");
});
viewsRouter.get ('/signup', getRegisterViewC)
viewsRouter.get('/home', getHomeViewC); 
//viewsRouter.get('/users', usersRouter);
viewsRouter.get('/chat', getChatPageC); 
//endpopint GET para obtener TODOS LOS PRODUCTOS con SOCKET.IO
viewsRouter.get('/realtimeproducts',getRealTimeProductsC); 
//endpopint GET para visualizar los carritos y manipularlos
viewsRouter.get('/carts',getCartsViewC); 
//endpopint GET para obtener TODOS LOS PRODUCTOS de FILE STORAGE
viewsRouter.get('/productsFS', getHomeProductsC);
viewsRouter.get('/error', getErrorPageC);


 

export default viewsRouter



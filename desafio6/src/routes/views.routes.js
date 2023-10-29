import {Router} from "express";
import { 
    getHomeViewC,
    getChatPageC, 
    getHomeProductsC,
    getRealTimeProductsC
} from '../controller/views.controller.js';




// corregir usando views,router del proyecto que me paso cristian y pasando la logica a views.controller.js

const viewsRouter = Router();
viewsRouter.get("/", (req, res) => {
    res.render("login");
});

viewsRouter.get('/home', getHomeViewC); 
//viewsRouter.get('/users', usersRouter);
viewsRouter.get('/chat', getChatPageC); 
//endpopint GET para obtener TODOS LOS PRODUCTOS con SOCKET.IO
viewsRouter.get('/realtimeproducts',getRealTimeProductsC); 
//endpopint GET para obtener TODOS LOS PRODUCTOS de FILE STORAGE
viewsRouter.get('/productsFS', getHomeProductsC);

 

export default viewsRouter



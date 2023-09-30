import {Router} from "express";



const router = Router();

//endpopint GET para obtener TODOS LOS PRODUCTOS
router.get('/', (req, res)=>{
    res.render("websocket");
    //res.render("chat");

}); 

export default router;
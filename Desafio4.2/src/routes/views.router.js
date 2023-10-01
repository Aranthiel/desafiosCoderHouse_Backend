import {Router} from "express";



const router = Router();

//endpopint GET para obtener TODOS LOS PRODUCTOS
router.get('/', (req, res)=>{
    res.render("home");
    //res.render("chat");

}); 

//endpopint GET para obtener TODOS LOS PRODUCTOS
router.get('/realtimeproducts', (req, res)=>{
    res.render("realtimeproducts");
    //res.render("chat");

}); 


export default router;
import {Router} from 'express';
import cartsRouter from './cart.routes.js';
import productsRouter from './products.routes.js';
import usersRouter from './users.routes.js';
import { getUserByIdC, getAllUsersC, findUserByEmailC, createUserC } from "../controller/users.controller.js";
// este archivo no funciona, l alkogica de usuarios se tuvo que definir en  apiRouter 

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.get('/users', usersRouter);
apiRouter.get('/users/pu', (req, res) => {
    console.log("llegaste a users/pu")

    res.render("pruebaUsuario");
});

///////////////////////////////////////


//endpopint GET para obtener TODOS LOS PRODUCTOS
apiRouter.get('/users/:uid', getUserByIdC);
apiRouter.get('/users/', getAllUsersC);


// endpoint para procesar el registro
/* apiRouter.get('/users/signup', (req, res) => {
    res.render('signup');
}); */
apiRouter.post ('/users/', (req, res) => {
    const { email, password} = req.body;
    req.session['email'] = email;
    res.send('Usuario logueado');
});

//http://localhost:8080/api/users/login
apiRouter.post('/users/login', findUserByEmailC); 


apiRouter.post('/users/signup', createUserC, (req, res) => {
    console.log("Llegó a la ruta POST /api/users/signup");
    console.log("Datos del formulario:", req.body);
});



//endpoint para procesar el login
/* apiRouter.post('/users/login', (req,res) =>{
    const {name, email} = req.body;
    res.cookie(name, email, {maxAge :10000}).send('cookie agregada');
})
 */


export default apiRouter;

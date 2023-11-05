import {Router} from 'express';
import cartsRouter from './cart.routes.js';
import productsRouter from './products.routes.js';
import usersRouter from './users.routes.js';
import { getUserByIdC, 
        getAllUsersC, 
        findUserByEmailC, 
        createUserC, 
        passportLocalAuthSignup,
        passportLocalAuthLogin,
        passportGithubAuth, 
        passportGithubCallback } from "../controller/users.controller.js";
// este archivo no funciona, l alkogica de usuarios se tuvo que definir en  apiRouter 

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.get('/users', usersRouter);
apiRouter.get('/users/pu', (req, res) => {
    console.log("llegaste a users/pu")

    res.render("pruebaUsuario");
});

//////////////////USERS/////////////////////

//http://localhost:8080/api/users/login
//apiRouter.post('/users/login', findUserByEmailC); 


//apiRouter.post('/users/signup', createUserC);
/*
apiRouter.post('/users/signup', createUserC, (req, res) => {
    console.log("Llegó a la ruta POST /api/users/signup");
    console.log("Datos del formulario:", req.body);
});
*/

//endpopint GET para obtener TODOS LOS USUARIOS
apiRouter.get('/users/', getAllUsersC);
//endpopint GET para obtener un uduario por su ID
apiRouter.get('/users/:uid', getUserByIdC);

//passport-local
apiRouter.post('/users/login', passportLocalAuthLogin);
apiRouter.post('/users/signup', passportLocalAuthSignup);

// passport-github
apiRouter.get("/users/auth/github", passportGithubAuth);
apiRouter.get("/github", passportGithubCallback);



export default apiRouter;


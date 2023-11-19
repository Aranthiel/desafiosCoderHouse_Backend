import {Router} from 'express';
import cartsRouter from './cart.routes.js';
import productsRouter from './products.routes.js';
import usersRouter from './users.routes.js';
import passport from "passport";
import { getUserByIdC, 
        getAllUsersC, 
        findUserByEmailC, 
        createUserC, 
        passportLocalAuthSignup,
        passportLocalAuthLogin,
        passportGithubAuth, 
        passportGithubCallback 
    } from "../controller/users.controller.js";
// este archivo no funciona, l alkogica de usuarios se tuvo que definir en  apiRouter 

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.get('/users', usersRouter);

//////////////////USERS/////////////////////

// passport-github
apiRouter.get("/users/auth/github", passportGithubAuth);
apiRouter.get("/users/github", passportGithubAuth, passportGithubCallback);

//endpopint GET para obtener TODOS LOS USUARIOS
apiRouter.get('/users/', getAllUsersC);
//endpopint GET para obtener un uduario por su ID
apiRouter.get('/users/:uid', getUserByIdC);

//passport-local
apiRouter.post('/users/login', passportLocalAuthLogin);
apiRouter.post('/users/signup', passportLocalAuthSignup);





export default apiRouter;


import express from 'express';
import cartsRouter from './cart.routes.js';
import productsRouter from './products.routes.js';
import usersRouter from '../../../desafio6/src/routes/users.routes.js';

const apiRouter = express.Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.get('/users', usersRouter);

export default apiRouter;

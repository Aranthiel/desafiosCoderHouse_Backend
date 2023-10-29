import {Router} from "express";
import { getUserByIdC, getAllUsersC, findUserByEmailC, createUserC } from "../controller/users.controller.js";
//este archivo no está en uso 

const usersRouter = Router();

//endpopint GET para obtener TODOS LOS PRODUCTOS
usersRouter.get('/:uid', getUserByIdC);
usersRouter.get('/', getAllUsersC);


// endpoint para procesar el registro
usersRouter.get('/signup', (req, res) => {
    res.render('signup');
});

usersRouter.post ('/', (req, res) => {
    const { email, password} = req.body;
    req.session['email'] = email;
    res.send('Usuario logueado');
});

//http://localhost:8080/api/users/login
usersRouter.post('/login', findUserByEmailC); 

///http://localhost:8080/api/users/signup
//usersRouter.post('/signup', createUserC )
usersRouter.post('/signup', createUserC, (req, res) => {
    console.log("Llegó a la ruta POST /api/users/signup");
    console.log("Datos del formulario:", req.body);
});


//endpoint para procesar el login
/* usersRouter.post('/login', (req,res) =>{
    const {name, email} = req.body;
    res.cookie(name, email, {maxAge :10000}).send('cookie agregada');
})
 */
export default usersRouter
import {Router} from 'express';
import { getUserByIdC, getAllUsersC, findUserByEmailC, createUserC } from "../controller/users.controller.js";


const usersRouter = Router();

usersRouter.get('/pu', (req, res) => {
    console.log("llegaste a usersRouter")
    res.render("pruebaUsuario");
});

export default usersRouter
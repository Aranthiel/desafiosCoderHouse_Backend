import { userManagerMongoose } from '../services/usersM.manager.js';
import { hashData, compareData } from "../utils.js";
import passport from "passport";
//getUserById, findUserByEmail, createUser

async function getUserByIdC (req, res){
    console.log('ejecutando getUserByIdC desde users.controller.js')
    const {uid}= req.params;
    try {
        const userById = await userManagerMongoose.getUserById(uid);
        if (userById){
            console.log(uid);
            res.status(200).json({success: true, message: 'Usuario encontrado:', userById})
            return userById;
        } else {
            res.status(401).json({ success: false, message: 'No se encontro el Id de usuario solicitado'})
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


async function getAllUsersC (req, res){
    console.log('ejecutando getAllUsersC desde users.controller.js')
    try {
        
    } catch (error) {
        
    }
};


async function findUserByEmailC(req, res){
    console.log('ejecutando findUserByEmailC desde users.controller.js')
    const {email, password} = req.body
    try {
        const userByEmail = await userManagerMongoose.findUserByEmail(email);
        if (!userByEmail){
            res.status(401).json({ success: false, message: 'Email o pasword incorrecto'})
        } 
        const isValid = await compareData(password, userByEmail.password);
        if (!isValid) {
            res.status(401).json({ success: false, message: 'Email o pasword incorrecto'})
        }else {
            req.session.email = email;
            req.session.first_name = userByEmail.first_name;
            if (email === "adminCoder@coder.com" && password === "Cod3r123") {
                req.session.isAdmin = true;
            }
            res.status(200).redirect(`/productsFS?email=${email}&first_name=${userByEmail.first_name}`);
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function createUserC (req, res){
    console.log('ejecutando createUserC desde users.controller.js') 
    console.log('Datos del formulario:', req.body);  
    const {email, password} = req.body
    try {
        const allReadyExist = await userManagerMongoose.findUserByEmail(email);
        if (allReadyExist) {
            return res.status(400).json({ message: "El usuario ya existe con este correo electrónico" });
        }
        else {
            const hashedPassword = await hashData(password);
            const newUser = await userManagerMongoose.createUser({...req.body, password: hashedPassword});
            console.log('newUser', newUser)
            return res.status(200).json({message: "Nuevo usuario creado", newUser
        })}
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

function passportLocalAuthSignup(req, res, next) { //el usuario se crea, pero no se hace la redireccion
    console.log('ejecutando passportLocalAuthSignup desde users.controller.js') 
    passport.authenticate("signup", {
        successRedirect: "/",
        failureRedirect: "/error",
    })(req, res, next);
};

async function passportLocalAuthLogin(req, res, next) {
    console.log('ejecutando passportLocalAuthLogin desde users.controller.js') 
    const {email, password} = req.body
    passport.authenticate("login")(req, res, async (err) => {
        if (err) {
            // Maneja errores si ocurren durante la autenticación
            console.log(err);
            return res.redirect("/error"); // Redirige a la página de error en caso de error
        }

        // Accede a la información del usuario autenticado
        const userByEmail = req.user;
        console.log('userByEmail en passportLocalAuthLogin', userByEmail);
        
        req.session.email = userByEmail.email;
        req.session.first_name = userByEmail.first_name;
        const isValid = await compareData(password, userByEmail.password);
        if (email === "adminCoder@coder.com" && isValid) {
            req.session.isAdmin = true;
        }

        console.log('redireccionando a productsFS desde passportLocalAuthLogin en users.controller.js');
        res.redirect("/productsFS"); // Redirige al usuario a la ruta deseada
        //res.status(200).render("productsFS", {products, email, first_name});
    });
}



/*
function passportLocalAuthLogin(req, res, next) { // hace la redireccion, pero no 
    console.log('ejecutando passportLocalAuthLogin desde users.controller.js') 
    passport.authenticate("login", {
        successRedirect: "/productsFS",
        failureRedirect: "/error",
    })(req, res, next);
};
*/

const passportGithubAuth = passport.authenticate("github", { scope: ["user:email"] });

const passportGithubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
};


export {
    getUserByIdC,
    getAllUsersC,
    findUserByEmailC, 
    createUserC,
    passportLocalAuthSignup, 
    passportLocalAuthLogin,
    passportGithubAuth, 
    passportGithubCallback
    }
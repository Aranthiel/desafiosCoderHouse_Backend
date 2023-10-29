import { userManagerMongoose } from '../services/usersM.manager.js';
//getUserById, findUserByEmail, createUser

async function getUserByIdC (req, res) {
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
    try {
        
    } catch (error) {
        
    }
};


async function findUserByEmailC(req, res){
    const {email, password} = req.body
    try {
        const userByEmail = await userManagerMongoose.findUserByEmail(email);
        if (!userByEmail){
            res.status(401).json({ success: false, message: 'No se encontro el usuario con el mail solicitado'})
        }
        req.session["email"]=email;
        req.session["first_name"]= userByEmail.first_name;
        if (email === "adminCoder@coder.com" && password === "Cod3r123") {
            req.session["isAdmin"] = true;
        }
        res.status(200).redirect("/realtimeproducts");
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function createUserC (req, res){    
    try {
        const newUser = await userManagerMongoose.createUserC(req.body);
        return res.status(200).json({message: "Nuevo usuario creado", newUser})
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export {
    getUserByIdC,
    getAllUsersC,
    findUserByEmailC, 
    createUserC
    }
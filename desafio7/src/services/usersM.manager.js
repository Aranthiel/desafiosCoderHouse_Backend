import {userModel} from '../db/models/users.models.js';

class UserManagerMongoose {
    async getUserById(id){
        console.log('ejecutando getUserById en usersM.manager.js');
        const response = await userModel.findById(id);
        return response;
    };

    async findUserByEmail(email){
        console.log('ejecutando findUserByEmail en usersM.manager.js');
        const response = await userModel.findOne({ email });
        return response;
    }
    
    // 29/10/2023 15.30 funciona OK, no tocar
    async createUser(obj) {
        console.log('ejecutando createUser en usersM.manager.js');
        try {
            const response = await userModel.create(obj);
            console.log('Usuario creado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return error;
        }
    }
    
}

export const userManagerMongoose= new UserManagerMongoose();

const randomNumber = Math.floor(Math.random() * 1000);

// Datos del usuario de prueba
const userPrueba = {
    first_name: 'Usuario' + randomNumber,
    last_name: 'Prueba' + randomNumber,
    email: 'usuario' + randomNumber + '@prueba.com',
    password: 'password123' + randomNumber, 
};

const nuevoUsuario = await userManagerMongoose.createUser(userPrueba);

if (nuevoUsuario) {
    console.log('Usuario creado con éxito:', nuevoUsuario._id);
} else {
    console.log('Error al crear el usuario.');
}

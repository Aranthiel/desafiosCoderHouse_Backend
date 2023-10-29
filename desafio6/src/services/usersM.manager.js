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

// Datos del usuario de prueba
const userPrueba = {
    first_name: 'Usuario',
    last_name: 'Prueba',
    email: 'usuario@prueba.com',
    password: 'password123', 
};

const nuevoUsuario = await userManagerMongoose.createUser(userPrueba);

if (nuevoUsuario) {
    console.log('Usuario creado con éxito:', nuevoUsuario);
} else {
    console.log('Error al crear el usuario.');
}

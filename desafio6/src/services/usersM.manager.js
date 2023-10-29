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
    
    async createUser(obj){
        console.log('ejecutando createUser en usersM.manager.js');
        const response = await userModel.create(obj);
        return response;
    }
}


export const userManagerMongoose= new UserManagerMongoose();


import {userModel} from '../db/models/users.models.js';

class UserManagerMongoose {
    async getUserById(id){
        const response = await userModel.findById(id);
        return response;
    };

    async findUserByEmail(email) {
        const response = await userModel.findOne({ email });
        return response;
    }
    
    async createUser(obj) {
        const response = await userModel.create(obj);
        return response;
    }
}


export const userManagerMongoose= new UserManagerMongoose();


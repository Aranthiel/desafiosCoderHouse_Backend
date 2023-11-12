import {userModel} from '../db/models/users.models.js';
import BasicManager from './basic.manager.js';

class UsersBManager extends BasicManager{
    constructor () {
        super(userModel, "Carritos");

    }
}

export const usersBManager = new UsersBManager();
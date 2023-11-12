import { Schema, model } from "mongoose";

// Crear esquema
const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	from_github: {
		type: Boolean,
		default: false,
	},
	cart:{
		type: Schema.Types.ObjectId,
        ref: 'Carritos', // Nombre de la colección a la que haces referencia
            
	}
});


// Crear modelo
export const userModel = model('Usuarios', userSchema);

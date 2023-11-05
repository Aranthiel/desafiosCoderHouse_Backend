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
});


// Crear modelo
export const userModel = model('Usuarios', userSchema);

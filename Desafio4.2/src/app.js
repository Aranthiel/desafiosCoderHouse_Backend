import express from 'express';
import { engine } from "express-handlebars";

//import exphbs from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import path from 'path';






const app=express();


console.log('__dirname', __dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", engine());
//app.engine('handlebars', exphbs());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");



const PORT =8081;
app.listen(PORT, ()=>{
    console.log(`Escuchando al puerto ${PORT}`);
});
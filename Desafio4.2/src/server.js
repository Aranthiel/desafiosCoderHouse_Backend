/// EXPRESS
import express from 'express';
import productsRouter from './controller/productsController.js'
import cartRouter from './controller/cartController.js';



//handlebars'
import { engine } from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import path from 'path';

//socket.io
import http from 'http'; // Necesario para Socket.io
import { Server } from 'socket.io'; // Para gestionar las conexiones de WebSocket



const app = express();
const port=8080;

//Middleware para que Express pueda analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

//handlebars
app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// Inicia el servidor
app.listen(port, ()=>(
    console.log(`Pruebas server express. Servidor escuchando en http://localhost:${port}`)
));

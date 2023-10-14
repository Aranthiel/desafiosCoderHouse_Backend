/// EXPRESS
import express from 'express';
import apiRouter from './routes/api.routes.js';

//handlebars'
import { engine } from "express-handlebars";
import viewsRouter from './routes/views.routes.js';
import { __dirname } from './utils.js';
import path from 'path';

//socket.io 
import { initializeSocket } from "./socket/socketServer.js";

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
app.use("/api", apiRouter);
app.use("/", viewsRouter);

//proporcionar una respuesta clara y consistente en caso de que un cliente solicite una ruta que no existe en la aplicación
app.get("*", async (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found.",
        data: {}
    })
});

// Inicia el servidor
const httpServer = app.listen(port, ()=>(
    console.log(`Pruebas server express. Servidor escuchando en http://localhost:${port}`)
));

//const socketServer = new Server(httpServer);
initializeSocket(httpServer);  


    

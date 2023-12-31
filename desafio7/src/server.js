/// EXPRESS
import express from 'express';
import apiRouter from './routes/api.routes.js';
// coockie parser
import cookieParser from "cookie-parser";

// session
import session from "express-session";
import FileStore from "session-file-store";
import mongoStore from "connect-mongo";

//passport
import passport from 'passport';
import './passport.js';

//handlebars'
import { engine } from "express-handlebars";
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.routes.js';
import path from 'path';

//mongoose
import "./db/config.js";

//socket.io 
import { initializeSocket } from "./socket/socketServer.js";

const app = express();
const port=8080;

//Middleware para que Express pueda analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

//session
const fileStore = FileStore(session)
app.use(cookieParser());
/*
app.use(session({
    secret: 'sessionsecretkey',
    cookie: {
        maxAge: 30000,
    },
    store: new fileStore({
        path: __dirname + '/sessions',
    }),    
    resave: false, // Establece resave en false para evitar la advertencia
    saveUninitialized: true, // Establece saveUninitialized en true para evitar la advertencia
}))
*/

// session con mongo
app.use(session({
    store: new mongoStore({
        mongoUrl:'mongodb+srv://nmoronidalmasso:Naty1982@mi1cluster.dnkjwvk.mongodb.net/chbackend?retryWrites=true&w=majority',
    }),
    secret: 'mongosessionsecretkey',
    cookie: {
        maxAge: 30000,
    },
}))

//passport

app.use(passport.initialize());
app.use(passport.session());


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


    

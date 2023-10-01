/// EXPRESS
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './controller/cartController.js';

//handlebars'
import { engine } from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import path from 'path';

//socket.io
import { Server } from 'socket.io'; // Para gestionar las conexiones de WebSocket

//para intereactuar con los productos
import { getAllProductsC,
    getProductByIdC,
    addProductC,
    updateProductC,
    deleteProductC,} from './controller/products.controller.js'

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
console.log('__dirname: ', __dirname);
const httpServer = app.listen(port, ()=>(
    console.log(`Pruebas server express. Servidor escuchando en http://localhost:${port}`)
));

const socketServer = new Server(httpServer);

// connection - disconnect
// eventos predeterminados de socket.io  
    socketServer.on("connection", async (socket) =>{
        console.log (`se ha conectado el cliente ${socket.id}`);
        // Crea un objeto req simulado con la propiedad query
        const simulatedReq = {
            query: { limit: 30 } // Establece el límite en 30
        };

        // Crea un objeto res simulado, puedes dejarlo como null
        const simulatedRes = {
            status: (statusCode) => {
                // Implementa la lógica para manejar el código de estado aquí
                return {
                    json: (data) => {
                        // Implementa la lógica para enviar una respuesta JSON con el código de estado
                        if (statusCode === 200) {
                            // Éxito
                            console.log(`Código de estado: ${statusCode}`);
                            console.log('Respuesta JSON:', data);
                        } else {
                            // Otro código de estado (por ejemplo, error)
                            console.error(`Código de estado: ${statusCode}`);
                            console.error('Respuesta JSON:', data);
                        }
                    }
                };
            }
        };

        // busca productos 
        await getAllProductsC(simulatedReq, simulatedRes)
        .then((productosIniciales) => {       
            // envía la lista al cliente
            socket.emit('productosIniciales', productosIniciales);
            console.log ('productosIniciales en server.js', productosIniciales);
        })
        .catch((error) => {
            console.error('Error al obtener productos iniciales:', error);
        });

        //agrega un nuevo producto usando  el controlador
        socket.on('addProduct', async (nuevoProducto) => {
            console.log('Evento "addProduct" recibido en el servidor con los siguientes datos:', nuevoProducto);
            const simulatedReq2= { body: nuevoProducto }; 
    

            // agrega el nuevo producto usando el controlador
            const productoAgregado = await addProductC(simulatedReq2, simulatedRes );
            console.log(productoAgregado);
            console.log(productoAgregado.success)

            if (productoAgregado.success) {
                // Emite la lista actualizada de productos a todos los clientes
                const productosActualizados = await getAllProductsC(simulatedReq, simulatedRes);
                socketServer.emit('productsUpdated', productosActualizados);
            } else {
                console.log('No se pudo agregar el producto');
            }
        });

        socket.on('borrar', async (selectedProductIds) => {
            console.log('Evento "borrar" recibido en el servidor con los siguientes datos:', selectedProductIds);
            
            const deletePromises = selectedProductIds.map((productId) => {
                const simulatedReq3 = { params: { pid: productId }};
                return deleteProductC(simulatedReq3, simulatedRes);
            });

            try {
                // Esperar a que todas las promesas se completen
                await Promise.all(deletePromises);
                console.log('Todas las eliminaciones se completaron con éxito');
            } catch (error) {               
                console.error('Error durante la eliminación:', error);
            }
        })

        socket.on("disconnect", () =>{
            console.log(`cliente desconectado ${socket.id}`)
        })
    });
    

   



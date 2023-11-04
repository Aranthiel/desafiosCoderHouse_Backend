import { Server } from 'socket.io'; // Para gestionar las conexiones de WebSocket
//para intereactuar con los productos
import { getAllProductsC,
    getProductByIdC,
    addProductC,
    updateProductC,
    deleteProductC,} from '../controller/products.controller.js';
import { chatModel } from "../db/models/chat.model.js";

let socketServer;
export function initializeSocket(server) {
    socketServer = new Server(server)

    const names =[];
    const messages=[];

    // connection - disconnect
    // eventos predeterminados de socket.io  


    socketServer.on("connection", async (socket) => {
        console.log(`se ha conectado el cliente ${socket.id}`);

        const productosIniciales = await getAllProductsSocket();
        socket.emit('productosInicialesRT', productosIniciales);

        // Handle Chat Functionality
        handleChat(socket);

        // Handle Real-Time Products Functionality
        handleRealTimeProducts(socket);

        // Handle Static Products Functionality
        //handleStaticProducts(socket);

        // Handle Disconnect
        socket.on("disconnect", () => {
            console.log(`cliente desconectado ${socket.id}`);
        });
    });

    // CHAT funciona perfecto, no tocar 29/10/2023 2:00am
    async function handleChat(socket) {
        socket.on("newChatUser", (user) => {
            socket.broadcast.emit('newChatUserBroadcast', user);
        });

        socket.on("newChatMessage", (info) => {
            console.log('Mensaje recibido:', info);
            
            const newMessage = new chatModel({
                name: info.name,
                message: info.message
            });
        
            console.log('Nuevo mensaje a guardar:', newMessage);
        
            newMessage
                .save()
                .then(savedMessage => {
                    console.log('Mensaje guardado con éxito. ID:', savedMessage._id);
                    messages.push(info);
                    socketServer.emit('chatMessages', messages);
                })
                .catch(error => {
                    console.error('Error al guardar el mensaje:', error);
                });
        });
    } 

    // RealTimeProducts funciona perfecto, no tocar 29/10/2023 2:00am
    async function getAllProductsSocket() {
        try {
            const response = await fetch('http://localhost:8080/api/products/');
            if (response.ok) {
                const productos = await response.json();
                return productos;
            } else {
                console.error("Error al obtener productos: ", response.status, response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    }

    async function handleRealTimeProducts(socket) {
        
        //funcion para hacer fetch a 'http://localhost:8080/api/products/' y devolver una response de forma de reemplazar getAllProductsC por esta funcion en el resto del codigo

        socket.on('addProduct', async (nProduct) => {
            console.log('Evento "addProduct" recibido en el servidor con los siguientes datos:', nProduct);
            
            const newProductData = {
                title: nProduct.title,
                price: nProduct.price,
                status: nProduct.status,
                category: nProduct.category,
                code: nProduct.code,
                stock: nProduct.stock
            };

            try {
                const response = await fetch('http://localhost:8080/api/products/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProductData)
                });

                if (response.ok) {
                    // Emite la lista actualizada de productos a todos los clientes
                    const productosActualizados = await getAllProductsSocket();
                    socketServer.emit('productsUpdated', productosActualizados);
                } else {
                    console.error("Error al agregar el producto: ", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error al agregar el producto:", error);
            }
        });
        

        socket.on('borrar', async (selectedProductIds) => {
            console.log('Evento "borrar" recibido en el servidor con los siguientes datos:', selectedProductIds);
            try {
                for (const productId of selectedProductIds) {
                    try {
                        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            console.error("Error al eliminar el producto: ", response.status, response.statusText);
                        }
                    } catch (error) {
                        console.error("Error al eliminar el producto:", error);
                    }
                }

                console.log('Todas las eliminaciones se completaron con éxito');
                const productosActualizados = await getAllProductsSocket();
                socketServer.emit('productsUpdated', productosActualizados);
            } catch (error) {
                console.error('Error durante la eliminación:', error);
            }
        });
    }

    // Handle Static Products Functionality
    /* async function handleStaticProducts(socket) {
        try {
            const productosIniciales = await getAllProductsC();
            console.log('productosIniciales en socketserver', productosIniciales);
            socket.emit("productosIniciales", productosIniciales);
        } catch (error) {
            console.error("Error al obtener productos iniciales:", error);
        }
    } */


};




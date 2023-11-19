import { Server } from 'socket.io'; // Para gestionar las conexiones de WebSocket

import { chatModel } from "../db/models/chat.model.js";
import dotenv from 'dotenv';

const PORT = dotenv.PORT || 8080; // Si no hay variable PORT definida, usa 8080 por defecto
const BASE_URL = `http://localhost:${PORT}/api/`;

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
        
        const carritosIniciales = await getAllCartsSocket();
        socket.emit('carritosInicialesRT', carritosIniciales);

        // Handle Chat Functionality
        handleChat(socket);

        // Handle Real-Time Products Functionality
        handleRealTimeProducts(socket);

        // Handle carts view Functionality
        handleCarts(socket);

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
            const response = await fetch(`${BASE_URL}products/`);
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
        
        //funcion para hacer fetch a `${BASE_URL}products/` y devolver una response de forma de reemplazar getAllProductsC por esta funcion en el resto del codigo

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
                const response = await fetch(`${BASE_URL}products/`, {
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
                        const response = await fetch(`${BASE_URL}/products/${productId}`, {
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
    };

    async function getAllCartsSocket() {
        try {
            const response = await fetch(`${BASE_URL}carts`);
            if (response.ok) {
                const carritos = await response.json();
                return carritos;
            } else {
                console.error("Error al obtener carritos: ", response.status, response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Error al obtener carritos:", error);
            return [];
        }
    }
    
    async function handleCarts(socket) {
        // Escuchar el evento cartViewLoaded y emitir evento carritosInicialesRT
        socket.on('cartViewLoaded', async () => {
            try {
                const carritosIniciales = await getAllCartsSocket(); // Corregir la función a llamar: getAllCartsSocket
                socket.emit('carritosInicialesRT', carritosIniciales);
            } catch (error) {
                console.error('Error al obtener los carritos iniciales', error);
            }
        });
    
        // Escuchar evento crearCarrito
        socket.on('crearCarrito', async (selectedProductIds) => {
            console.log('Evento "crearCarrito" recibido en el servidor con los siguientes datos:', selectedProductIds);
            const newCartData = {
                products: selectedProductIds.map(productId => ({
                    productoId: productId,
                    quantity: 1
                }))
            };
    
            try {
                const response = await fetch(`${BASE_URL}carts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCartData)
                });
    
                if (response.ok) {
                    // Emite la lista actualizada de productos a todos los clientes
                    const carritosActualizados = await getAllCartsSocket(); // Corregir la función a llamar: getAllCartsSocket
                    // Emitir evento cartsUpdated
                    socketServer.emit('cartsUpdated', carritosActualizados);
                } else {
                    console.error("Error al agregar el carrito: ", response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error al crear el carrito', error);
            }
        });
    }
    
};




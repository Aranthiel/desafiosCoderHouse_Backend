console.log("index.js concetado - Probando 1 2 3");
const socketClient = io();
console.log('socketClient', socketClient)

const div = document.getElementById("homeDiv");
const title = document.createElement("h2");
title.textContent = "Productos Estáticos";

window.addEventListener('load', function() {
    // Escuchar el evento para recibir los productos iniciales
    socketClient.on("productosIniciales", (productosIniciales) => {
        console.log('productosIniciales en index.js', productosIniciales);
        productos = productosIniciales;
        // Crear una lista desordenada (<ul>) para los productos
        const ul = document.createElement("ul");
            
        // Iterar a través de los productos y crear elementos de lista (<li>)
        productos.forEach((producto) => {
            const li = document.createElement("li");
            li.id = `product_${producto.id}`; // Asignar el id del producto al elemento li

            const productInfo = document.createElement("span");
            productInfo.textContent = `Título: ${producto.title}, Precio: ${producto.price}`;
            li.appendChild(productInfo);
        
            ul.appendChild(li); // Agregar el elemento de lista a la lista desordenada
        });

        // Limpiar el div y agregar la lista de productos iniciales
        div.innerHTML = "";
        div.appendChild(title);
        div.appendChild(ul); 
    });
});


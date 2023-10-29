async function handleRealTimeProducts(socket) {
    
    // ACA NECESITO AGREGAR UNA funcion getAllProductsSocket para hacer fetch a 'http://localhost:8080/api/products/' y devolver una response de forma de reemplazar getAllProductsC por esta funcion en el resto del codigo

    socket.on('addProduct', async (nProduct) => {
        console.log('Evento "addProduct" recibido en el servidor con los siguientes datos:', nProduct);
        
        // agrega el nuevo producto usando el controlador
        const productoAgregado = await addProductC(nProduct); 
        /* aca necesito hacer un fetch tipo POST a http://localhost:8080/api/products/ y pasar  const newProductData = {
            title: nProduct.title,
            price: nProduct.price,
            status: nProduct.status,
            category: nProduct.category,
            code: nProduct.code,
            stock: nProduct.stock
        };  en lugar de usar addProductC(nProduct)*/
       

        if (productoAgregado.success) {
            // Emite la lista actualizada de productos a todos los clientes
            const productosActualizados = await getAllProductsC(); // aca necesito que se use la funcion getAllProductsSocket en lugar de  getAllProductsC
            socketServer.emit('productsUpdated', productosActualizados);
        } else {
            console.log('No se pudo agregar el producto');
        }
    });

    socket.on('borrar', async (selectedProductIds) => {
        console.log('Evento "borrar" recibido en el servidor con los siguientes datos:', selectedProductIds);
        try {
            for (const productId of selectedProductIds) {
                const result = await deleteProductC(productId); // aca necesito reemplazar deleteProductC con un fetch del tipo delete a la URL http://localhost:8080/api/products/:pid donde pid es = productId
                console.log(result.message);
            }
            console.log('Todas las eliminaciones se completaron con éxito');
            const productosActualizados = await getAllProductsC();
            socketServer.emit('productsUpdated', productosActualizados);
        } catch (error) {
            console.error('Error durante la eliminación:', error);
        }
    });

    

    // Realizar una solicitud HTTP a la API para obtener productos iniciales
    try {
        const response = await fetch('http://localhost:8080/api/products/'); //y aca deberia simplemente usar la funcion getAllProductsSocket
        if (response.ok) {
            const productosIniciales = await response.json();
            //console.log('productosIniciales en socketserver', productosIniciales);
            socket.emit('productosInicialesRT', productosIniciales);
        } else {
            console.error("Error al obtener productos iniciales: ", response.status, response.statusText);
        } 
    } catch (error) {
        console.error("Error al obtener productos iniciales:", error);
    }
}
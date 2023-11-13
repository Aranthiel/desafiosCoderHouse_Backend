function renderCartDetail(cartId) {
    console.log('Detalle carrito para renderizar con ID:', cartId);
    const productos = getCartDetail(cartId);

    const cardContainer = document.createElement("div");
    
    productos.forEach((producto) => {
        const productCardDiv = document.createElement("div");
        productCardDiv.classList = `poductCardDiv`;
        
        const productCardTittle = document.createElement("h5");
        productCardTittle.classList = 'productCardTittle'
        productCardTittle.textContent = producto.title;
        productCardDiv.appendChild(productCardTittle);
    
        const productCardCode = document.createElement("p");
        productCardCode.textContent = `Título: ${producto.code}`;
        productCardDiv.appendChild(productCardCode);

        const productCardCategory = document.createElement("p");
        productCardCategory.textContent = `Título: ${producto.category}`;
        productCardDiv.appendChild(productCardCategory);

        const productCardPrice = document.createElement("p");
        productCardPrice.textContent = `Título: ${producto.price}`;
        productCardDiv.appendChild(productCardPrice);

        const productCardQuantity = document.createElement("p");
        productCardQuantity.textContent = `Título: ${producto.quantity}`;
        productCardDiv.appendChild(productCardQuantity); 

        const productCardTotal = document.createElement("p");
        productCardTotal.textContent = producto.quantity*producto.price;
        productCardDiv.appendChild(productCardTotal);   
        ul.appendChild(productCardDiv);
    });

    productsDiv.innerHTML = "";
    productsDiv.appendChild(titleDetail);
    productsDiv.appendChild(cardContainer);
}

async function getCartDetail(cartId) {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/${cartId}`);
        if (response.ok) {
            const productos = await response.json();
            console.log('getCartDetail productos', productos)
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
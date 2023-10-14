
console.log("It's alive!");

const socketClient = io();
const form = document.getElementById("productForm");
const div = document.getElementById("showProducts");

const title = document.createElement("h2");
title.textContent = "Productos";

const deleteButton = document.createElement("button");
deleteButton.textContent = "Eliminar Productos";

// Inicializar productos como un arreglo vacío
let productos = [];
console.log('productos', productos);

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    console.log("form submit")

    // Obtener los valores del formulario
    const title = document.getElementById("title").value;
    const code = document.getElementById("code").value;
    const price = parseFloat(document.getElementById("price").value);
    const status = document.getElementById("status").checked;
    const stock = parseInt(document.getElementById("stock").value);
    const category = document.getElementById("category").value;

    // Crear un objeto con los datos del producto
    const nProduct = {
        title,
        code,
        price,
        status,
        stock,
        category,
        limit: 30, 
    };
   

    // Enviar el producto al servidor a través de Socket.io
    console.log('Enviando evento "addProduct" con los siguientes datos:', nProduct);
    socketClient.emit("addProduct", nProduct);

    // Limpiar el formulario
    form.reset();
});

// Escuchar el evento para recibir los productos iniciales
socketClient.on("productosIniciales", (productosIniciales) => {
    console.log('productosIniciales en realtimeproducts.js', productosIniciales);
    productos = productosIniciales;
    // Crear una lista desordenada (<ul>) para los productos
    const ul = document.createElement("ul");
        
    // Iterar a través de los productos y crear elementos de lista (<li>)
    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.id = `product_${producto.id}`; // Asignar el id del producto al elemento li

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox_${producto.id}`; // Asignar un id único al checkbox
        li.appendChild(checkbox);
    
        const productInfo = document.createElement("span");
        productInfo.textContent = `Título: ${producto.title}, Precio: ${producto.price}`;
        li.appendChild(productInfo);
    
        ul.appendChild(li); // Agregar el elemento de lista a la lista desordenada
    });

    // Limpiar el div y agregar la lista de productos iniciales
    div.innerHTML = "";
    div.appendChild(title);
    div.appendChild(ul); 
    div.appendChild(deleteButton);

    // Agregar lógica para eliminar productos
    deleteButton.addEventListener("click", () => {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedProductIds = Array.from(selectedCheckboxes).map((checkbox) => {
            return checkbox.id.replace("checkbox_", "");
        });

        const confirmation = window.confirm(`¿Ha seleccionado ${selectedProductIds.length} productos. ¿Está seguro que desea eliminarlos?`);

        if (confirmation) {
            // Emitir el evento "borrar" con los IDs de los productos seleccionados
            console.log('Enviando evento "borrar" con los siguientes datos:', selectedProductIds);
            socketClient.emit("borrar", selectedProductIds);

            // Desmarcar las checkbox
            selectedCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }
    });
});

/* Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  }) */
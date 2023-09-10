/* PROCESO DE TESTING */
import { producto1, producto2, producto3,producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11 } from './objetosPrueba.js';
import { ProductManager} from './ProductManager.js';


async function test() {    
    const pathTest='Products.json';    
    try {        
        /* Se creará una instancia de la clase “ProductManager” */
        const productManager = new ProductManager(pathTest);

        /* Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] */
        const productos = await productManager.getProducts();
        console.log("Productos Iniciales:", productos);

        /* Se llamará al método “addProduct” con producto1. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE */
        await productManager.addProduct(producto1);

        /* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado */
        const productosUpdated1 = await productManager.getProducts();
        console.log("Productos 1ra actualización, se agrega 1 prducto:", productosUpdated1);

        /* Se llamará al método “addProduct” con el objeto producto2, debe arrojar un error porque el código estará repetido */
        await productManager.addProduct(producto2);

        /*VERIFICACIONES EXTRAS*/
        /* Agregar algunos productos de muestra */
        await productManager.addProduct(producto3);
        await productManager.addProduct(producto4);
        await productManager.addProduct(producto5);
        await productManager.addProduct(producto6);
        await productManager.addProduct(producto7);
        await productManager.addProduct(producto8);
        await productManager.addProduct(producto9);
        await productManager.addProduct(producto10);
        await productManager.addProduct(producto11);


        /* Se llamará el método “getProducts” nuevamente, esta vez deben aparecer 5 productos */
        const productosUpdated2 = await productManager.getProducts();
        console.log("Productos 2da actualización: 5 productos en total", productosUpdated2); 

        /*Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo*/
        const productId1 = await productManager.getProductById(1);
        console.log('productId1', productId1); /* devuelve el producto con ID 1*/
        const productId2 = await productManager.getProductById(2);
        console.log('productId2', productId2); /* devuelve el producto con ID 5*/
        const productId150 = await productManager.getProductById(150);
        console.log('productId10', productId150); /** el ID 10 no existe, debe dar error*/

        /*Se se verifica que updateProduct no permita modificar el ID */
        await productManager.updateProduct(1, {id: 106});

        /*Se se verifica que updateProduct actualice un producto */
        let newproduct = {
            title: 'producto prueba 6',
            description: 'Este es un producto de prueba',
            price: 180,
            thumbnail: 'Sin imagen 76',
            code: 'Testeo',
            stock: 165
        }
        await productManager.updateProduct(4, newproduct);
        const productosUpdated3 = await productManager.getProducts();
        console.log("Productos 3ra actualización: se modificaron varias propiedades delproducto 4", productosUpdated3);

        /*Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto */
        await productManager.deleteProduct(2);
        const productosUpdated4 = await productManager.getProducts();
        console.log("Productos 4ta actualización: se elimina producto prueba 3", productosUpdated4);

        /*Se llamará al método “deleteProduct”, se evaluará que arroje un error en caso de no existir.*/
        await productManager.deleteProduct(120);


    } catch (error) {
        console.error('Ocurrió un error en las pruebas:', error);
    }
}

test();
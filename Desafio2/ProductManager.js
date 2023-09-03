const fs=require('fs')

class ProductManager{
    /*Debe crearse desde su contructor con el elemento products, el cual será un arreglo vacío */

    constructor(path){ 
        /* la clase debe contar con una varuiable this.path el cual se inicializara desde el contructor y debe recibir la ruta a trabajar desde el momento de generar su instancia*/
        this.path=path;       
        //this.products=[]
    }

    /* Debe contar con un metodo getProducts el cual debe devolver un arreglo vacio o el arreglo con todos los productos creados hasta el momento */
    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(info);
            } else {
                return [];
            };            
        } catch (error) {
            return error;            
        };
    };

    /* Debe tener un método addProduct que debe recibir un objeto con el formato previamente especificado y asignarle un id autoincrementable y guardarlo en un arreglo*/
    async addProduct(obj){
        try {
            const products = await this.getProducts();

            // Validar que todos los campos sean obligatorios
            if (!obj.title || !obj.description || !obj.price || !obj.thumbnail || !obj.code || !obj.stock) {
                console.log('Todos los campos son obligatorios. No se pudo agregar el producto.');
                return;
            }
            
            // Validar que no se repita el campo code
            if (products.find(e => e.code === obj.code)) {
                console.log(`El código de producto ${obj.code} ya existe y no se puede utilizar`);
                return;
            }

            // Asignar un ID autoincremental al producto
            if (!products.length) {
                // Si el arreglo de productos está vacío, asigna el ID 1
                obj.id = 1;
            } else {
                obj.id = products[products.length-1].id+1;
            }

            // Agregar el producto al arreglo
            products.push(obj);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            return error
        }
    };
    
    /* Debe contar con un metodo getProductById el cual debe buscar en el arreglo el producto que coincida con el id */
    async getProductById(productId){
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === productId);
            if(!product){
                //return `ERROR:NOT FOUND. El producto ${productId} NO se encuentra en el listado de productos, por favor ingrese un producto válido`;
                console.log(`ERROR:NOT FOUND. El producto ${productId} NO se encuentra en el listado de productos, por favor ingrese un producto válido`);
                return null; // Devuelve null en lugar de una cadena de error
        
            } else {
                return product;
            };
            
        } catch (error) {
            return error
        }
    };

    
    async updateProduct(productId, property, newValue){
        try {
            // Buscar el producto a actualizar por su ID
            const product = await this.getProductById(productId);
    
            // Verifica si la propiedad a actualizar es el ID
            if (property === 'id') {
                console.log('ERROR: No se puede actualizar la propiedad "id".');
                return;
            }
    
            // Mostrar el producto antes de la actualización
            //console.log('Producto antes de la actualización:', product);
    
            // Actualiza la propiedad dinámicamente usando la notación de corchetes
            product[property] = newValue;
    
            // Mostrar el producto actualizado
            //console.log('Producto actualizado:', product);
    
            //Recuperar el arreglo de productos
            const products = await this.getProducts();
    
            // Encontrar el índice del producto en el arreglo
            const productIndex = products.findIndex(p => p.id === productId);    
            // console.log('Índice del producto a actualizar:', productIndex);
    
            // Crear un nuevo array con el producto actualizado usando map
            const productsNew = products.map((p, index) => {
                // comprobar si este es el producto que queremos actualizar
                if (index === productIndex) {
                    // Devuelve el producto actualizado
                    return product;
                } else {
                    // Devuelve el producto original sin cambios
                    return p;
                }
            });
    
            // Sobreescribir el archivo .json
            await fs.promises.writeFile(this.path, JSON.stringify(productsNew));
    
        } catch (error) {
            return error;
        }
    };
    
    
    async deleteProduct(productId){
        // Verifica la existencia del producto
        const product = await this.getProductById(productId);
        
        try {
            const products = await this.getProducts()
            const productsNew = products.filter(prod=>prod.id!==productId)
            await fs.promises.writeFile(this.path,JSON.stringify(productsNew))
        } catch (error) {
            return error;    
        }
    };
};

const producto1 = {
    title: 'producto prueba 1',
    description: 'Este es un producto prueba 1',
    price: 200,
    thumbnail: 'Sin imagen 1',
    code: 'abc123',
    stock: 25
};

const producto2 = {
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    price: 1500,
    thumbnail: 'Sin imagen 2',
    code: 'abc123',
    stock: 105
};

const producto3 = {
    title: 'producto prueba 3',
    description: 'Este es otro producto prueba 3',
    price: 210,
    thumbnail: 'Sin imagen 3',
    code: 'ghi789',
    stock: 30
};

const producto4 = {
    title: 'producto prueba 4',
    description: 'Este es otro producto prueba 4',
    price: 250,
    thumbnail: 'Sin imagen 4',
    code: 'jkl012',
    stock: 40
};

const producto5 = {
    title: 'producto prueba 5',
    description: 'Este es otro producto prueba 5',
    price: 300,
    thumbnail: 'Sin imagen 5',
    code: 'mno345',
    stock: 20
};

const producto6 = {
    title: 'producto prueba 6',
    description: 'Este es otro producto prueba 6',
    price: 180,
    thumbnail: 'Sin imagen 6',
    code: 'pqr678',
    stock: 15
};

/* PROCESO DE TESTING */
async function test() {    
    const pathTest='Products.json';
    if (fs.existsSync(pathTest)){
        await fs.promises.unlink(pathTest); // elimina el archivo .json para comensar la prueba desde 0 
    } 
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

        /* Se llamará el método “getProducts” nuevamente, esta vez deben aparecer 5 productos */
        const productosUpdated2 = await productManager.getProducts();
        console.log("Productos 2da actualización: 5 productos en total", productosUpdated2); 

        /*Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo*/
        const productId1 = await productManager.getProductById(1);
        console.log('productId1', productId1); /* devuelve el producto con ID 1*/
        const productId2 = await productManager.getProductById(2);
        console.log('productId2', productId2); /* devuelve el producto con ID 5*/
        const productId10 = await productManager.getProductById(10);
        console.log('productId10', productId10); /** el ID 10 no existe, debe dar error*/

        /*Se se verifica que updateProduct no permita modificar el ID */
        await productManager.updateProduct(1, 'id', 10);

        /*Se se verifica que updateProduct actualice un producto */
        await productManager.updateProduct(1, 'title', 'producto prueba 1 modificado con updateProduct');
        const productosUpdated3 = await productManager.getProducts();
        console.log("Productos 3ra actualización: se modifica la propiedad title del producto prueba 1", productosUpdated3);

        /*Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto */
        await productManager.deleteProduct(2);
        const productosUpdated4 = await productManager.getProducts();
        console.log("Productos 4ta actualización: se elimina producto prueba 3", productosUpdated4);

        /*Se llamará al método “deleteProduct”, se evaluará que arroje un error en caso de no existir.*/
        await productManager.deleteProduct(12);


    } catch (error) {
        console.error('Ocurrió un error en las pruebas:', error);
    }
}

test();




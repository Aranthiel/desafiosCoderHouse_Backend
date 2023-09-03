class ProductManager{
    /*Debe crearse desde su contructor con el elemento products, el cual será un arreglo vacío */

    constructor(){        
        this.products=[]
    }

    /* Debe contar con un metodo addProduct el cual agregará un producto al arreglo de productos inicial */
    addProduct(title, description, price, thumbnail, code, stock){
        /* Validar que no se repita el campo code y que todos los campos sean obligatorios */
        if(title && description && price && thumbnail && code && stock){
            if (this.products.find(e=>e.code===code)){
                console.log(`El código de producto ${code} ya existe y no se puede utilizar`);
                return;
            } else {
                /*Cada producto que gestione debe contar con las propiedades title, description, price, thumbnail, code, stock*/
                const product ={
                    id: this.products.length+1, 
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }
                this.products.push(product);
            }
        }
    };

    /* Debe contar con un metodo getProducts el cual debe devolver el arreglo con todos los productos creados hasta el momento */
    getProducts(){
        if(!this.products.length){
            return `La cantidad de productos es ${this.products.length}. Agrega algun porducto para poder continuar`;
        } else {
            return this.products;
        }
    };
    
    /* Debe contar con un metodo getProductById el cual debe buscar en el arreglo el producto que coincida con el id */
    getProductById(productId){
        const product = this.products.find(product => product.id === productId);
        
        if(!product){
            return `ERROR:NOT FOUND. El producto ${productId} NO se encuentra en el listado de productos, por favor ingrese un producto válido`;
        } else {
            return product;
        };
    };
}

/* Se creará una instancia de la clase “ProductManager” */
const productManager = new ProductManager();

/* Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] */
console.log(productManager.getProducts()); 

/* Se llamará al método “addProduct” con los campos: title: “producto prueba”,  description:”Este es un producto prueba”, price:200, thumbnail:”Sin imagen”, code:”abc123”, stock:25. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE */
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);


/* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado */
console.log(productManager.getProducts()); 

/*Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido*/
productManager.addProduct('producto prueba2', 'producto prueba', 280, 'Sin imagen', 'abc123', 25);

/*verificaciones extras*/
/* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer solo 1 producto */
console.log(productManager.getProducts()); 

/* Se llamará al método “addProduct” con un valor diferente en el campo code. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE */
productManager.addProduct('producto prueba3', 'Este es otro producto prueba', 210, 'Sin imagen', 'xyz123', 25);
/* Se llamará el método “getProducts” nuevamente, esta vez deben aparecer 2 productos */
console.log(productManager.getProducts()); 

/*Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo*/
console.log(productManager.getProductById(1)); /* devuelve el producto con ID 1*/
console.log(productManager.getProductById(2)); /* devuelve el producto con ID 5*/
console.log(productManager.getProductById(5)); /* el ID 5 no existe, debe dar error*/




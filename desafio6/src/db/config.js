import mongoose, { Mongoose } from "mongoose"; // ¿para que carancho importe esto { Mongoose }?

const URI = 'mongodb+srv://nmoronidalmasso:Naty1982@mi1cluster.dnkjwvk.mongodb.net/chbackend?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(()=>console.log('Conectado a la base de datos'))
.catch((error) =>console.log(error));

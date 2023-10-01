console.log("index.js concetado - Probando 1 2 3");
const socketClient = io();
console.log('socketClient', socketClient)

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
console.log('inputPrice', inputPrice);

form.onsubmit = (e) => {
    e.preventDefault();
    //const userName = inputName.value;
    const price = inputPrice.value;
    socketClient.emit("firstEvent", price);
    console.log("primer evento disparado!");
    console.log('price', price);
};

socketClient.on("secondEvent", (info) => {
    console.log(`New price: ${info}`);
});
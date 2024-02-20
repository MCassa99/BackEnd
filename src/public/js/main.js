const socket = io();

socket.emit('new-product', 'Coca Cola'); //Emitimos el evento new-product al servidor

socket.emit('delete-product', 'Coca Cola'); //Emitimos el evento delete-product al servidor

socket.on('mensaje-usuario', (data) => { //Escuchamos el evento mensaje-usuario
     console.log(data);
});

socket.on('delete-product', (data) => { //Escuchamos el evento mensaje-usuario
     console.log(data);
});

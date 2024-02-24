const socket = io();

const checkbox = document.getElementById('chatBox');
const chat = document.getElementById('messageLogs');
let user;

Swal.fire({
     title: 'Bienvenido!',
     input: 'text',
     text: 'Ingrese su nombre de usuario',
     inputPlaceholder: 'Nombre de usuario',
     inputValidator: (value) => {
          if (!value) {
               return 'Por favor, ingrese un nombre de usuario';
          }
     },
     allowOutsideClick: false,
     allowEscapeKey: false
}).then((result) => {
     user = result.value;
     console.log(user);
});

chatBox.addEventListener('keyup', (e) => {
     if (e.key === 'Enter') {
          if (chatBox.value.trim().length > 0) {
               socket.emit('message', { user, msg: chatBox.value });
               chatBox.value = '';
          }
          socket.emit('new-user', user);
     }
});

socket.on('messageLogs', (msgs) => {
     chat.innerHTML = '';
     msgs.forEach(msg => {
          chat.innerHTML += `<p class='message'><strong>${msg.user}:</strong> ${msg.msg}</p>`;
     });
});
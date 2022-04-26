const socket = io();

socket.on('products', (products) => handleProducts(products));

socket.on('messages', (messages) => {
  console.log(messages);
  showMessages(messages);
});

const addProductForm = document.getElementById('formAddProduct');
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const product = {
    title: addProductForm[0].value, // document.getElementById('txtNombre').value
    price: addProductForm[1].value, // document.getElementById('txtApellido').value
    thumbnail: addProductForm[2].value,
  };

  socket.emit('newProduct', product);

  addProductForm.reset();
});

async function handleProducts(products) {
  const recursoRemoto = await fetch('views/index.handlebars');
  const layoutText = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(layoutText);
  const html = functionTemplate({ products });
  document.getElementById('products').innerHTML = html;
}

function showMessages(messages) {
  const mensajesParaMostrar = messages.map(({ date, email, text }) => {
    return `<li style="width:100%"><strong style="color:blue;display:inline;">${email}</strong> - <p style='color:brown;display:inline;'>${date}</p> <i style='color:green;display: block; overflow-wrap: break-word'>${text}</i></li>\n`;
  });

  const show = mensajesParaMostrar.join(`\n`);
  const listaMensajes = document.getElementById('messages');
  listaMensajes.innerHTML = show;
}

const sendButton = document.getElementById('send');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');
  if (inputEmail.value && inputMessage.value) {
    const message = {
      email: inputEmail.value,
      text: inputMessage.value,
      date: `${('0' + new Date().getDate()).slice(-2)}/${('0' + (new Date().getMonth() + 1)).slice(
        -2
      )}/${new Date().getFullYear()} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(
        -2
      )}:${('0' + new Date().getSeconds()).slice(-2)}`,
    };
    socket.emit('newMessage', message);
  } else {
    alert('ingrese algun mensaje');
  }
});

    const socket = io()

    // Funcionalidad y métodos del cliente
    socket.emit('message', "Comunicando desde WebSocket")


    // realtimeproducts
    const form = document.getElementById("form")

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const code = document.getElementById('code').value
        const price = document.getElementById('price').value
        const stock = document.getElementById('stock').value
        const category = document.getElementById('category').value

        socket.emit('addProduct', { title, description, code, price, stock, category })
        form.reset()
    })

    // Escuchar el evento 'productAdded' desde el servidor
    socket.on('productAdded', (newProduct) => {
        const newProductElement = document.createElement('li');
        newProductElement.textContent = `${newProduct.id} - ${newProduct.title} - ${newProduct.price} - ${newProduct.description}`;

        // Crear un botón de eliminar para el nuevo producto
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => {
            // Lógica para eliminar el producto
            // Puedes emitir un evento al servidor para manejar la eliminación del producto
        };

        // Agregar el botón de eliminar al nuevo elemento de lista
        newProductElement.appendChild(deleteButton);

        // Agregar el nuevo elemento de lista al listado de productos en tiempo real
        document.getElementById('realtimeProductList').appendChild(newProductElement);
    });
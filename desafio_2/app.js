const ProductManager = require('./src/ProductManager.js')
const productManager = new ProductManager()

// TEST DESAFIO_2

productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(productManager.getProducts())
productManager.getProductById(1)    
const ProductManager = require('./src/ProductManager.js')
const manager = new ProductManager()

// TEST DESAFIO_2

manager.addProduct("Producto Uno", "Este es un producto 1", 200, "Sin imagen", "abc123", 25)
manager.addProduct("Producto Dos", "Este es un producto 2", 150, "Sin imagen", "abc456", 30)


async function getAllProducts(){
    const productList = await manager.getProducts();
    console.log(productList);
}

getAllProducts()

// async function getProductById2(id){
//     const productFound = await manager.getProductById(id)
//     console.log(productFound)
// }

// getProductById2(1)

manager.getProductById(1)
manager.updateProduct(1, {price: 300})
manager.deleteProduct(2)
getAllProducts()


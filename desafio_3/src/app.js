const express = require('express')
const app = express()
const PORT = 8080
const ProductManager = require('./ProductManager.js')
const manager = new ProductManager(`${__dirname}/products.json`)

manager.addProduct("Producto Uno", "Este es un producto 1", 200, "Sin imagen", "abc101", 25)
manager.addProduct("Producto Dos", "Este es un producto 2", 150, "Sin imagen", "abc102", 30)
manager.addProduct("Producto Tres", "Este es un producto 3", 450, "Sin imagen", "abc103", 54)
manager.addProduct("Producto Cuatro", "Este es un producto 4", 240, "Sin imagen", "abc104", 23)
manager.addProduct("Producto Cinco", "Este es un producto 5", 130, "Sin imagen", "abc105", 45)
manager.addProduct("Producto Seis", "Este es un producto 6", 260, "Sin imagen", "abc106", 86)
manager.addProduct("Producto Siete", "Este es un producto 7", 50, "Sin imagen", "abc107", 35)
manager.addProduct("Producto Ocho", "Este es un producto 8", 230, "Sin imagen", "abc108", 23)
manager.addProduct("Producto Nueve", "Este es un producto 9", 27, "Sin imagen", "abc109", 86)
manager.addProduct("Producto Diez", "Este es un producto 10", 45, "Sin imagen", "abc110", 24)


async function getAllProducts(){
    const productList = await manager.getProducts();
    console.log(productList);
}
getAllProducts()


/////// DESAFIO_3 //////////

//Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true})) // => para analizar el cuerpo de las solicitudes y para trabajar con queries y params


//Endpoints

// Get all products with a limit
app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)
    
    try {
        const products = await manager.getProducts()
        let limitedProducts = [...products]

        if (!isNaN(limit) && limit > 0) {
            limitedProducts = limitedProducts.slice(0, limit)
            res.json(limitedProducts)
        }
        res.json(products)
    } catch (error) {
        res.status(404).json({ message: "Error 404 - Productos no encontrados" })
    }

})

// Get one product by ID
app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        const product = await manager.getProductById(pid);
        if (product) {
            res.json(product);
        } 
    } catch (error) {
        res.status(404).json({ message: "Error 404 - Producto no encontrado." })
    }

})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})











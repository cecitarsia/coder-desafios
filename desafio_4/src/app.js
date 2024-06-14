// IMPORTS   
import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import ProductManager from "./managers/ProductManager.js";

const productManager = new ProductManager();
const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)


app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use("/", productsRouter)
app.use("/realtimeproducts", viewsRouter)
app.use("/", viewsRouter)


socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    productManager.getProducts()
    .then(products => {

        socketServer.emit('products', products)
        socketServer.emit('productsRealTime', products)
    })

    socket.on('addProduct', (data)=> {
        productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock, data.category)
        .then(() => {
            productManager.getProducts()
            .then(products => {
                socketServer.emit('productsRealTime', products)
            })
        })

    })


    socket.on('deleteProduct', (data) => {
        productManager.deleteProduct(data)
        .then(() => {
            productManager.getProducts()
            .then((products) =>{
                socketServer.emit('productsRealTime', products)
            })
        })
    })
})


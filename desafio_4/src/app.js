// IMPORTS   
import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'

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

app.use("/api/products", productsRouter)
app.use("/api/realtimeproducts", viewsRouter)
app.use("/", viewsRouter)


socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    socket.on('message', data => {
        console.log(data)
    })



})
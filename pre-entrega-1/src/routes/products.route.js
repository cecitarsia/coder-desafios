const fs = require('fs')
const express = require("express")
const router = express.Router()
const path = require("path")

const products = []


// Traer todos los productos
router.get("/products", (req,res) => {
    fs.readFileSync('products.json', 'utf8', (err,data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
        }

        const products = JSON.parse(data)
        const limit = parseInt(req.query.limit)
        if (limit) {
            res.json(products.slice(0,limit))            
        } 
        res.json(products)
    })
})


// Agregar un producto
router.post("/products", (req,res) => {
    const  { title, description, price, thumbnail, code, stock } = req.body

    if ( !title || !description || !price || !thumbnail || !code || !stock !== undefined ) {
        res.status(500).json( [ { message: 'Todos los campos son requeridos.' } ] )
    }
    if (products.find((product) => product.code === code )) {
        res.status(500).json( [ { message: 'Ya existe un producto con ese código.' } ] ) 
    }
    const id = products.length + 1
    const product = {
        id: id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    products.push(product)
    // Escribir en el archivo JSON
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error("Error al escribir en el archivo:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.status(200).json({ message: "Producto agregado" });
        }
    });
})



module.exports = router
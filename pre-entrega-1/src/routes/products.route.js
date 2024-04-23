const fs = require('fs').promises
const express = require("express")
const router = express.Router()
const ProductManager = require('../managers/ProductManager')
const productManager = new ProductManager()


// Traer todos los productos
router.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit)
    try {
        const products = await productManager.getProducts()
        let limitedProducts = [...products]

        if (!isNaN(limit) && limit > 0) {
            limitedProducts = limitedProducts.slice(0, limit)
            res.json(limitedProducts)
        }
        res.json(products);
    } catch (error) {
        res.status(404).json({ message: "404 - Productos no encontrados" });
    }

})

// Agregar un producto
router.post("/products", async (req,res) => {
    try {
        const result = await productManager.addProduct(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: "No se pudo agregar el producto." });
    }
})

module.exports = router
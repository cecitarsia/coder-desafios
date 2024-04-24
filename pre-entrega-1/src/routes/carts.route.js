const fs = require('fs')
const express = require("express")
const router = express.Router()
const CartManager = require('../managers/CartManager')
const cartManager = new CartManager()

// Traer todos los carritos
router.get("/carts", async (req,res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        res.status(404).json({ message: "404 - No hay carritos" });
    }
})


// Traer un carrito por ID
router.get("/carts/:cid", async (req, res) => {
    try {
        let cid = parseInt(req.params.cid);
        const cartResult = await cartManager.getCartById(cid);
        res.json(cartResult);

        } catch (error) {
        res.status(404).json({ message: "Error 404 - Carrito no encontrado." });
    }
})

// Agregar un carrito
router.post("/carts", async (req, res) => {
    try {
        const result = await cartManager.addCart(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error 404 - No se pudo agregar el carrito." });
    }
})

router.post("/carts/:cid/product/:pid", async (req, res) => {
    try {
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        const result = await cartManager.updateCart(cid,pid)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error 404 - No se pudo agregar el producto al carrito." });
    }
    
})

module.exports = router
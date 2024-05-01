import { Router } from 'express';
import ProductManager from '../managers/ProductManager'
import { __dirname } from "../utils.js"

const productManager=new ProductManager()
const router = Router()

// Trae la vista de todos los productos
router.get("/",async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("home",{products})
})

// Trae el formulario para cargar productos
router.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})

export default router
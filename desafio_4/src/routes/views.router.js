import { Router } from 'express';
const router = Router()
import ProductManager from '../managers/ProductManager.js'

const productManager = new ProductManager()


// Trae la vista de todos los productos
router.get("/",async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("home",{products})
})

// Trae la vista del formulario para cargar productos y los productos en real time
router.get('/realtimeproducts', (req,res) => {
    res.render('realtimeproducts', {})
})



export default router
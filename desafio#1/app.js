// DESAFÍO #1

class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const code_exists = this.products.find((product) => product.code === code) //this.products.includes(code)
        if (!code_exists) {
            const id = this.products.length + 1
            const product = {
                id: id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            this.products.push(product)
            return
        }
        console.log("El código ya existe.")
    }

    getProductById(id) {
        const product_found = this.products.find((product)=> product.id===id) //this.products.includes(id)
        if (!product_found) {
            console.log("Not found.") 
            return
        }
        console.log(product_found) 
    }
}

const productManager = new ProductManager()

const products = console.log(productManager.getProducts())
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen")
const products2 = console.log(productManager.getProducts())
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getProductById(1)
productManager.getProductById(2)
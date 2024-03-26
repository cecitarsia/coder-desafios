// DESAFÍO #1

class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const code_exists = this.products.find((product) => product.code === code)
        const product_is_valid =  title && description && price && thumbnail && code && stock !== undefined
        
        if (!product_is_valid) {
            console.log("No se pudo agregar el producto, todos los campos son obligatorios.")
        } else if (code_exists) {
            console.log("No se pudo agregar el producto, el código ya existe.")
        } else {
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
            console.log("Producto agregado.")
            return
        }
    }

    getProductById(id) {
        const product_found = this.products.find((product)=> product.id===id)
        if (!product_found) {
            console.log("Not found.") 
            return
        }
        console.log(product_found) 
    }

}

const productManager = new ProductManager()

console.log(productManager.getProducts())
console.log("_________________________________________________________")
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("_________________________________________________________")
console.log(productManager.getProducts())
console.log("_________________________________________________________")
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("_________________________________________________________")
productManager.addProduct("Otro producto prueba", "Este es otro producto prueba", 100, "Sin imagen", "lalala")
console.log("_________________________________________________________")
productManager.getProductById(2)
console.log("_________________________________________________________")
productManager.getProductById(1)
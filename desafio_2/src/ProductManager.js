// DESAFÍO #2
const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.products = []
        this.path = "Products.json"
    }

    async getProducts() {
        try {
            return await this.readProducts();
        } catch (error) {
            console.error("Error al consultar productos", error);
            return []
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let products = await this.readProducts()
            const codeExists = this.products.find((product) => product.code === code)
            const productIsValid = title && description && price && thumbnail && code && stock !== undefined
            
            if (!productIsValid) {
                console.log("No se pudo agregar el producto, todos los campos son obligatorios.")
            } else if (codeExists) {
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
                await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log("Producto agregado.")
                return
            }
        } catch (error) {
            console.error("Error al agregar producto", error);
        }
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readProducts()
            const productFound = this.products.find((product) => product.id === id)
            if (!productFound) {
                console.log("Not found.")
            }
        } catch (error) {
            console.error("ID de producto no encontrado", error);
        }
        return productFound
    }

}

module.exports = ProductManager
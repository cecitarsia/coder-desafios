// DESAFÍO #3
const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const codeExists = this.products.find((product) => product.code === code)
            const productIsValid = title && description && price && thumbnail && code && stock !== undefined
            
            if (!productIsValid) {
                console.log("No se pudo agregar el producto, todos los campos son obligatorios.")
                return;
            } 
            
            if (codeExists) {
                console.log("No se pudo agregar el producto, el código ya existe.")
                return;
            } 
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
            
        } catch (error) {
            console.error("Error al agregar producto", error);
        }
    }

    async getProducts() {
        try {
            return await this.readProducts()
        } catch (error) {
            console.error("Error al consultar productos", error);
            return []
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
            const products = await this.getProducts()
            const productFound = await products.find((product) => product.id === id)
            if (!productFound) {
                return 'El producto buscado no existe'
            } else {
                return productFound;
            }
        } catch (error) {
            console.error("ID de producto no encontrado", error);
        }
    }

    async updateProduct(id, value) {
        try {
            const products = await this.getProducts()
            // const index = products.indexOf(p => p.id === id) //--> No entiendo xq no funciona este
            const index = products.findIndex(p => p.id === id)
            if(index !== -1) {
                products[index] = { ...products[index], ...value};
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            }else{
                console.log("No se encontro el ID del producto a actualizar");
            }

        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.readProducts()
            const index = products.findIndex(p => p.id === id)

            if(index !== -1) {
                const newProductList = products.filter(p => p.id != id)
                await fs.writeFile(this.path, JSON.stringify(newProductList, null, 2))
            }else{
                console.log("No se encontro el ID del producto a remover");
            }

        } catch (error) {
            console.log('No se pudo borrar el producto')  
        }
    }
}



module.exports = ProductManager
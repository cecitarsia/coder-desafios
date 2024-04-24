#Pre-entrega-1 BackEnd

### Stack:
- NodeJS
- Express

### Listado de endpoints:
#### Producto

- Get All Products
localhost:8080/products
- Get All Products with Limit
localhost:8080/products?limit=[limit]
- Get One Product by ID
localhost:8080/products/:id
- Add Product
localhost:8080/products

En body:
  {
    "title": "[title]",
    "description": "[description]",
    "code": "[code]”,
    "price": [price],
    "status": true,
    "stock": [stock],
    "category": "[category]",
    "thumbnail": null
   }
- Update Product by ID
localhost:8080/products/:id
- Delete Product
localhost:8080/products/:id


#### Carrito

- Get All Carts
localhost:8080/carts
- Get Cart by ID
localhost:8080/carts/:id
- Add Cart
localhost:8080/carts
- Update Product in Cart by ID
localhost:8080/carts/:id/product/:id


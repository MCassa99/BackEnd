import crypto from "crypto";

class ProductManager {
     constructor() {
          this.products = [];
     }

     addProduct(product) {
          const { title, description, price, thumbnail, code, stock } = product;

          if (title && description && price && thumbnail && code && stock) {
               const index = this.products.findIndex((p) => p.code === product.code);
               if (index === -1) {
                    product.id = crypto.randomBytes(16).toString("hex");
                    this.products.push(product);
               } else {
                    console.log("Product already exists");
               }
          } else {
               console.log("Invalid product data. Product must have title, description, price, thumbnail, code, and stock.");
          }
     }

     getProducts() {
          return this.products;
     }
     
     getProductById(id) {
          return this.products.find((product) => product.id == id) ? this.products.find((product) => product.id == id) : "Product not found";
     }
}

let instance = new ProductManager();

console.log(instance.getProducts());

const product1 = {
     title: "Product 1",
     description: "Description 1",
     price: 100,
     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png",
     code: "P1",
     stock: 10,
};

const product2 = {
     title: "Product 2",
     description: "Description 2",
     price: 200,
     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png",
     code: "P2",
     stock: 20,
};
//Add product 1
instance.addProduct(product1);
//See all products
console.log(instance.getProducts());
//Add product 1 again
instance.addProduct(product1);

//Add product 2
instance.addProduct(product2);
//Find product 1 by id
console.log(instance.getProductById(product1.id));
//See all products
console.log(instance.getProducts());
import { promises as fs} from "fs";

export class ProductManager {
     constructor(path) {
          this.path = path;
     }

     async getProducts() {
          const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
          console.log(products);
     }
          
     async getProductById(id) {
          const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
          console.log(products.find((product) => product.id == id) ? products.find((product) => product.id == id) : "Product not found");
     }

     async addProduct(newProduct) {
          const { title, description, price, thumbnail, code, stock } = newProduct;
          const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));

          if (title && description && price && thumbnail && code && stock) {
               const index = products.findIndex((p) => p.code === newProduct.code);
               if (index === -1) {
                    products.push(newProduct);
                    await fs.writeFile(this.path, JSON.stringify(products));
                    console.log ("Product added successfully");
               } else {
                    console.log("Product already exists");
               }
          } else {
               console.log("Invalid product data. Product must have title, description, price, thumbnail, code, and stock.");
          }
     }

     async modifyProduct(id, product) {
          const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
          const { title, description, price, thumbnail, code, stock } = product;

          if (title && description && price && thumbnail && code && stock) {
               const index = products.findIndex((p) => p.id === id);
               if (index !== -1) {
                    products[index] = { ...product, id };
                    await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
                    return "Product modified successfully";
               } else {
                    console.log("Product not found");
               }
          } else {
               console.log("Invalid product data. Product must have title, description, price, thumbnail, code, and stock.");
          }
     }

     async deleteProduct(id) {
          const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
          const index = products.findIndex((product) => product.id === id);
          if (index !== -1) {
               const productsFiltered = products.filter((product) => product.id !== id);
               await fs.writeFile(this.path, JSON.stringify(productsFiltered));
               return "Product deleted successfully";
          } else {
               console.log("Product not found");
          }
     }
}
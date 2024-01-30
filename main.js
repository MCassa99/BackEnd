import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";

const product1 = new Product("Product 1", "Description 1", 100, "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png", "P1", 10);
const product2 = new Product("Product 2", "Description 2", 200, "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png", "P2", 20);
const product3 = new Product("Product 3", "Description 3", 300, "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png", "P3", 30);
const product4 = new Product("Product 4", "Description 4", 400, "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png", "P4", 40);
const product1V2 = new Product("Product 1", "Description 5", 100, "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png", "P1", 10);

const productManager = new ProductManager('./products.json');

//TESTING
//#1
// productManager.getProducts();

//#2
//Add product 1
productManager.addProduct(product1);
//See all products
productManager.getProducts();

//Add product 1 again for testing error
productManager.addProduct(product1);

//#3
//Add product 2
productManager.addProduct(product2);
//Find product 2 by id
productManager.getProductById(product2.id);
//Modify product 1 for product1V2
productManager.modifyProduct(product1.id, product1V2);
//See all products
productManager.getProducts();

//#4
//Delete product 2
productManager.deleteProduct(product2.id);
//See all products
productManager.getProducts();
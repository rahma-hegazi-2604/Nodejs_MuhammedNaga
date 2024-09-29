import express from 'express';
import { generateFakeData } from './utils/fakeData';
import { title } from 'process';
import { IProduct } from './interfaces';
import { fi } from '@faker-js/faker';
import ProductController from './controllers/productController';
import ProductService from './services/productService';
import { Request, Response } from "express";

const app = express();

app.use(express.json());

const fakeProductsData = generateFakeData();

const productService = new ProductService(fakeProductsData);
const productController = new ProductController(productService);

app.get('/', (req, res) => {
    res.send(`<h1>Hello Express.js</h1>`)
});


app.get('/products', (req, res) => productController.getProducts(req, res));

app.get('/products/:id', (req, res) => productController.getProductById(req, res));

//  CREATE NEW PRODUCT

app.post('/products', (req,res) => productController.createProduct(req, res));

// UPDATE PRODUCT

app.patch('/products/:id', (req,res) => productController.updateProduct(req, res));

//DELETE PRODUCT

app.delete('/products/:id', (req,res) => productController.deleteProduct(req, res));


const port: number = 5000;

app.listen(port, () => {
    console.log(`Server running at => http://localhost:${port}/products`);
});
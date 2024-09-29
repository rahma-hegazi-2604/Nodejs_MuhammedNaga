import express from 'express';
import { generateFakeData } from './utils/fakeData';
import { title } from 'process';

const app = express();

// send response
app.get('/', (req, res) => {
    res.send(`<h1>Hello Express.js</h1>`)
});

// const DummyProducts = [
//     {id: 1, name: 'Product 1'},
//     {id: 2, name: 'Product 2'},
//     {id: 3, name: 'Product 3'}
// ];

// install faker,js
// npm install @faker-js/faker --save-dev

const fakeProductsData = generateFakeData();

// End point to get request (products)

app.get('/products', (req, res) => {
    res.send(fakeProductsData)
});

// Route params

app.get('/products/:id', (req, res) => {
    console.log(req.params);  //return object
    const productId = +req.params.id;
    // make sure product id is a number
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }
    const findProduct: {id: number,title: string,price: number} | undefined = fakeProductsData.find(product=> product.id === productId);
    if(findProduct){
        res.send({id: productId, title: findProduct.title,price: findProduct.price },)
    }else{
        res.status(404).send({message: 'Product not found'});
    }
    
});


const port: number = 5000;

app.listen(port, () => {
    console.log(`Server running at => http://localhost:${port}/products`);
});
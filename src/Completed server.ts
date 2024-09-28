import express from 'express';
import { generateFakeData } from './utils/fakeData';
import { title } from 'process';
import { IProduct } from './interfaces';
import { fi } from '@faker-js/faker';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Hello Express.js</h1>`)
});


const fakeProductsData = generateFakeData();


app.get('/products', (req, res) => {
    // filter by , keyof IProduct
    // const queryParams = req.query;  // return object
    // console.log(queryParams);
    const filterQuery = req.query.filter as string;  // return string always
    console.log(filterQuery);  //if filterQuery is not present, it will be undefined

    if(filterQuery){
        const propertiesToFilter = filterQuery.split(',');

        let filteredProducts :any = [];

        filteredProducts = fakeProductsData.map(product => {

            const filteredProduct : any = {};

            propertiesToFilter.forEach(property => {

                if(product.hasOwnProperty(property)){
                    //filteredProduct['title] = product['title'];
                    filteredProduct[property] = product[property as keyof IProduct];
                }
            });

            return { id: product.id, ...filteredProduct};
        });
        res.send(filteredProducts);
    }


    res.send(fakeProductsData)
});

app.get('/products/:id', (req, res) => {
    console.log(req.params);  //return object
    const productId = +req.params.id;
    // make sure product id is a number
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }
    const findProduct: IProduct | undefined = fakeProductsData.find(product=> product.id === productId);
    if(findProduct){
        res.send({id: productId, title: findProduct.title,price: findProduct.price },)
    }else{
        res.status(404).send({message: 'Product not found'});
    }
    
});

//  CREATE NEW PRODUCT

app.post('/products', (req,res) => {
    const newProduct = req.body;

    fakeProductsData.push({id: fakeProductsData.length + 1, ...newProduct});

    res.status(201).send({
        id: fakeProductsData.length + 1,
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description
    });
});

// UPDATE PRODUCT

app.patch('/products/:id', (req,res) => {
    const productId = +req.params.id;
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }

    const ProductIndex: number | undefined = fakeProductsData.findIndex(product=> product.id === productId);
    const productBody = req.body;

    if(ProductIndex !== -1){
        fakeProductsData[ProductIndex] = {...fakeProductsData[ProductIndex], ...productBody};
        return res.status(200).send({message: 'Product updated successfully'});
    } else{
        return res.status(404).send({message: 'Product not found'});
    }

});

//DELETE PRODUCT

app.delete('/products/:id', (req,res) => {
    const productId = +req.params.id;
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }

    const ProductIndex: number | undefined = fakeProductsData.findIndex(product=> product.id === productId);
    if(ProductIndex !== -1){
        const filteredProduct = fakeProductsData.filter(product=> product.id !== productId);
        res.status(200).send(filteredProduct);
    } else{
        return res.status(404).send({message: 'Product not found'});
    }
});


const port: number = 5000;

app.listen(port, () => {
    console.log(`Server running at => http://localhost:${port}/products`);
});
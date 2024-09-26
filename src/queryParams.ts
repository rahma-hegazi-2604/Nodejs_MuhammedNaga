import express from 'express';
import { generateFakeData } from './utils/fakeData';
import { title } from 'process';
import { IProduct } from './interfaces';
import { fi } from '@faker-js/faker';

const app = express();

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

// Route params

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


const port: number = 5000;

app.listen(port, () => {
    console.log(`Server running at => http://localhost:${port}/products`);
});
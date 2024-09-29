import { IProduct } from "../interfaces";
import ProductService from "../services/productService";
import { Request, Response } from "express";

class ProductController {
    
    constructor(private productService:ProductService ) {}

    getProducts(req: Request, res: Response) {
        const filterQuery = req.query.filter as string;
        if(filterQuery) {
            return res.send(this.productService.filterByQuery(filterQuery));
        }
        return res.send(this.productService.findAll());
    }

    getProductById(req: Request, res:Response) {
        const productId = +req.params.id;
        // make sure product id is a number
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }

    const findProduct: IProduct | undefined = this.productService.getProductById(productId);
    
    // check if product is found
    if(findProduct){
        res.send({id: productId, title: findProduct.title,price: findProduct.price },)
    }else{
        res.status(404).send({message: 'Product not found'});
    }

    }

    createProduct(req: Request, res: Response) {
        const productBody = req.body;
        this.productService.createProduct(productBody);
    res.status(201).send({
        id: this.productService.findAll().length + 1,
        title: productBody.title,
        price: productBody.price,
        description: productBody.description
    });
    }

    updateProduct(req: Request, res: Response) {
        const productId = +req.params.id;
    
        if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }

    const productIndex: number | undefined = this.productService.findAll().findIndex(product=> product.id === productId);
    const productBody = req.body;

    if(productIndex !== -1){
        this.productService.updateProductByIndex(productIndex, productBody);
        return res.status(200).send({message: 'Product updated successfully'});
    } else{
        return res.status(404).send({message: 'Product not found'});
    }
    }

    deleteProduct(req: Request, res: Response) {
        const productId = +req.params.id;
    if(isNaN(productId)){
        res.status(404).send({message: 'Product not found'});
    }

    const ProductIndex: number | undefined = this.productService.findAll().findIndex(product=> product.id === productId);
    if(ProductIndex !== -1){
        const filteredProduct = this.productService.findAll().filter(product=> product.id !== productId);
        res.status(200).send(filteredProduct);
    } else{
        return res.status(404).send({message: 'Product not found'});
    }
    }
}

export default ProductController;
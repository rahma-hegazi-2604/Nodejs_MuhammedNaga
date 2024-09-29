import { th } from "@faker-js/faker";
import { IProduct } from "../interfaces";
import { generateFakeData } from "../utils/fakeData";

type IProductBody ={
    title: string;
    price: number;
    description: string;

}


export default class ProductService {

    constructor(private products: IProduct[]){
        this.products = products;
    }

    findAll(): IProduct[] {
        return this.products;
    }

    filterByQuery(filterQuery?: string){

        if(filterQuery){
            const propertiesToFilter = filterQuery.split(',');
        
            let filteredProducts :any = [];
        
            filteredProducts = this.findAll().map(product => {
        
            const filteredProduct : any = {};
        
            propertiesToFilter.forEach(property => {
    
            if(product.hasOwnProperty(property)){
                //filteredProduct['title] = product['title'];
                filteredProduct[property] = product[property as keyof IProduct];
            }
            });
        
                return { id: product.id, ...filteredProduct};
            });
                return filteredProducts;
            }
        
        
            return this.findAll();
        
    }

    // Filter by ID
    getProductById(productId: number){

        return this.findAll().find(product => product.id === productId);

    }

    // create new product
    createProduct(productBody:IProductBody){
        this.findAll().push({id: this.findAll().length + 1, ...productBody});
        ;

    }

    // update product
    updateProductByIndex(index: number, productBody:IProductBody){

        return this.findAll()[index] = {...this.findAll()[index], ...productBody};


    }
}




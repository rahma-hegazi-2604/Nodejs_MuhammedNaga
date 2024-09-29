import { faker } from '@faker-js/faker';
import { IProduct } from '../interfaces';


export const generateFakeData = (): IProduct[] => {
    return Array.from({ length: 25 }, (_, index) => {
        return{
            id: index + 1,
            title: faker.commerce.productName(),
            price: +faker.commerce.price({min: 100, max: 200}),
            description: faker.commerce.productDescription(),
        }
    })
}
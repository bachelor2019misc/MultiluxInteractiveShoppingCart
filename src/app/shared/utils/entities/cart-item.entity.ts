import { SubProduct } from './sub-product.entity';

export class CartItem {
    idSubProduct: number;
    title: string;
    description: string;
    watt: number;
    kelvin: number;
    lumen: number;
    price: number;
    amount: number; 
}
// globals.ts
import { Injectable } from '@angular/core';
import { Vessel } from '../models/vessel.model';
import { Room } from '../models/room.model';
import { Product } from '../models/product.model';
import { Blueprint } from '../models/blueprint.model';
import { CartItem } from '../models/cart-item.model';
import { SubProduct } from '../models/sub-product.model';
import { Currency } from '../models/currency.model';

@Injectable()
export class Globals {
    username: string;
    loggedIn: boolean = false;
    editMode: boolean = false;

    currentSelectedCurrency: Currency;
    currentSelectedVessel: Vessel;
    currentSelectedRoom: Room;
    currentSelectedProduct: Product;
    currentSelectedBlueprint: Blueprint;
    currentSelectedCartItems: CartItem[] = [];

    addSubProductToCart(subProduct: SubProduct) {
        console.log(subProduct);
        let newCartItem: CartItem = new CartItem;
        newCartItem.idProduct = subProduct.idProduct;
        newCartItem.idSubproduct = subProduct.idSubproduct;
        newCartItem.type = "vare";
        newCartItem.productNumber = subProduct.productNumber;
        newCartItem.title = subProduct.title;
        newCartItem.description = subProduct.description;
        newCartItem.locationCode = "BØ";
        newCartItem.price = subProduct.price;
        newCartItem.unitCode = "STK";

        this.currentSelectedCartItems.push(newCartItem);
    }
}
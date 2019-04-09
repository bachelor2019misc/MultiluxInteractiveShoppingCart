// globals.ts
import { Injectable } from '@angular/core';
import { Vessel } from './entities/vessel.entity';
import { Room } from './entities/room.entity';
import { Product } from './entities/product.entity';
import { Blueprint } from './entities/blueprint.entity';
import { CartItem } from './entities/cart-item.entity';
import { SubProduct } from './entities/sub-product.entity';

@Injectable()
export class Globals {
    username: string;
    loggedIn: boolean = false;
    editMode: boolean = false;

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
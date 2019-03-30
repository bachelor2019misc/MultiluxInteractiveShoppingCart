// globals.ts
import { Injectable } from '@angular/core';
import { Vessel } from './entities/vessel.entity';
import { Room } from './entities/room.entity';
import { Product } from './entities/product.entity';
import { Blueprint } from './entities/blueprint.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class Globals {
    username: string;
    loggedIn: boolean = false;
    editMode: boolean = false;

    currentSelectedVessel: Vessel;
    currentSelectedRoom: Room;
    currentSelectedProduct: Product;
    currentSelectedBlueprint: Blueprint;
    currentSelectedCartItems: CartItem[] = [
        { item: { idSubProduct: 1, title: 'productName', description: 'test', watt: 1000, kelvin: 800, lumen: 11000, price: 200 }, amount: 2 },
        { item: { idSubProduct: 2, title: 'productName', description: 'test', watt: 1000, kelvin: 800, lumen: 11000, price: 200 }, amount: 2 },
        { item: { idSubProduct: 3, title: 'productName', description: 'test', watt: 1000, kelvin: 800, lumen: 11000, price: 200 }, amount: 2 },
    ];
}
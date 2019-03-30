// globals.ts
import { Injectable } from '@angular/core';
import { Vessel } from './entities/vessel.entity';
import { Room } from './entities/room.entity';
import { Product } from './entities/product.entity';
import { Blueprint } from './entities/blueprint.entity';

@Injectable()
export class Globals {
    username: string;
    loggedIn: boolean = false;
    editMode: boolean = false;

    currentSelectedVessel: Vessel;
    currentSelectedRoom: Room;
    currentSelectedProduct: Product;
    currentSelectedBlueprint: Blueprint;
}
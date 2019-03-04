// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    username: string;
    loggedIn: boolean = false;
}
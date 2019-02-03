import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { VesselSelectionComponent } from './vessel-selection/vessel-selection.component';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { CanvasComponent } from './room-selection/canvas.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VesselSelectionComponent,
    RoomSelectionComponent,
    ProductSelectionComponent,
    CanvasComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: VesselSelectionComponent},
      {path: 'vessel-selection', component: VesselSelectionComponent},
      {path: 'room-selection', component: RoomSelectionComponent},
      {path: 'product-selection', component: ProductSelectionComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

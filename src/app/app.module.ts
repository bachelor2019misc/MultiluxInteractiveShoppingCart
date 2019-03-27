import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { VesselsComponent } from './shared/components/vessels/vessels.component';
import { RoomsComponent } from './shared/components/rooms/rooms.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { SubProductsComponent } from './shared/components/products/sub-products/sub-products.component';
import { RoomsCanvasComponent } from './shared/components/rooms/rooms-canvas/rooms-canvas.component';
import { ProductsCanvasComponent } from './shared/components/products/products.canvas.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './shared/components/login/login.component';
import { Globals } from './shared/utils/globals';

import { AddVesselComponent } from './shared/components/vessels/add-vessel/add-vessel.component'
import { EditVesselComponent } from './shared/components/vessels/edit-vessel/edit-vessel.component';
import { AddRoomComponent } from './shared/components/rooms/add-room/add-room.component';
import { EditRoomComponent } from './shared/components/rooms/edit-room/edit-room.component';



@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    RoomsComponent,
    ProductsComponent,
    SubProductsComponent,
    RoomsCanvasComponent,
    ProductsCanvasComponent,
    ShoppingCartComponent,
    LoginComponent,
    AddVesselComponent,
    EditVesselComponent,
    AddRoomComponent,
    EditRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([
      {path: '', component: VesselsComponent},
      {path: 'vessels', component: VesselsComponent},
      {path: 'rooms/:vesselId', component: RoomsComponent},
      {path: 'products/:vesselId/:roomId', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ])
  ],
  providers: [Globals],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SubProductsComponent, AddVesselComponent, EditVesselComponent, AddRoomComponent, EditRoomComponent]
})
export class AppModule { }

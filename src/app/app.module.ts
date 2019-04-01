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
  MatPaginatorModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSortModule,
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
import { ProductsCanvasComponent } from './shared/components/products/products-canvas/products-canvas.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AddUserComponent } from './shared/components/add-user/add-user.component';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { Globals } from './shared/utils/globals';
import { AddVesselComponent } from './shared/components/vessels/add-vessel/add-vessel.component';
import { EditVesselComponent } from './shared/components/vessels/edit-vessel/edit-vessel.component';
import { AddRoomComponent } from './shared/components/rooms/add-room/add-room.component';
import { EditRoomComponent } from './shared/components/rooms/edit-room/edit-room.component';
import { AddProductComponent } from './shared/components/products/add-product/add-product.component';
import { EditBlueprintComponent } from './shared/components/rooms/rooms-canvas/edit-blueprint/edit-blueprint.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { ProductComponent } from './shared/components/product/product.component';
import { NewProductComponent } from './shared/components/product-list/new-product/new-product.component';



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
    AddUserComponent,
    EditUserComponent,
    LogoutComponent,
    AddVesselComponent,
    EditVesselComponent,
    AddRoomComponent,
    EditRoomComponent,
    AddProductComponent,
    EditBlueprintComponent,
    ProductListComponent,
    ProductComponent,
    NewProductComponent
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {path: '', component: VesselsComponent},
      {path: 'vessels', component: VesselsComponent},
      {path: 'rooms/:idVessel', component: RoomsComponent},
      {path: 'products/:idVessel/:idRoom', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'product-list', component: ProductListComponent},
      {path: 'product/:idProduct', component: ProductComponent},
    ])
  ],
  providers: [Globals],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent, 
    LogoutComponent, 
    EditUserComponent, 
    AddUserComponent, 
    SubProductsComponent, 
    AddVesselComponent, 
    EditVesselComponent, 
    AddRoomComponent, 
    EditRoomComponent,
    NewProductComponent,
    AddProductComponent,
    EditBlueprintComponent,
  ]
})
export class AppModule { }

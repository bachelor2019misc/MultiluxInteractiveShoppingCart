import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
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
import { CanvasComponent } from './shared/utils/canvas/canvas.util';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    RoomsComponent,
    ProductsComponent,
    SubProductsComponent,
    CanvasComponent,
    ShoppingCartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    RouterModule.forRoot([
      {path: '', component: VesselsComponent},
      {path: 'vessels', component: VesselsComponent},
      {path: 'rooms', component: RoomsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SubProductsComponent]
})
export class AppModule { }

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
import { VesselSelectionComponent } from './vessel-selection/vessel-selection.component';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { ProductDialogComponent } from './product-selection/product-dialog.component';
import { CanvasComponent } from './room-selection/canvas.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    VesselSelectionComponent,
    RoomSelectionComponent,
    ProductSelectionComponent,
    ProductDialogComponent,
    CanvasComponent,
    ShoppingCartComponent,
    LoginDialogComponent
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
      {path: '', component: VesselSelectionComponent},
      {path: 'vessel-selection', component: VesselSelectionComponent},
      {path: 'room-selection', component: RoomSelectionComponent},
      {path: 'product-selection', component: ProductSelectionComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, ProductDialogComponent]
})
export class AppModule { }

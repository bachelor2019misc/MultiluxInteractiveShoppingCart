import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductOption } from './ProductOption';

@Component({

    template: 
        `   
        <form #form="ngForm" (ngSubmit)="submit(form.value)">
        <mat-dialog-content>
            <h1 mat-dialog-title>{{data.productName}}</h1>
            <mat-grid-list cols="4" rowHeight="1:1">
                <mat-grid-tile [colspan]="2" [rowspan]="1">
                    <img src="assets/img/{{ data.productImage }}" style="max-width: 100%; 
                        height: auto">
                </mat-grid-tile>
                <mat-grid-tile [colspan]="2" [rowspan]="1" style="overflow: auto">
                        {{ data.productDescription }}
                </mat-grid-tile>
            </mat-grid-list>
            
            <table align="center" id="productTable" mat-table [dataSource]="dataSource">
                <caption align="left">Product Options</caption>
                
                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef>
                        <mat-checkbox (change)="$event ? masterToggle() : null"
                            [checked]="selection.hasValue() && isAllSelected()"
                            [indeterminate]="selection.hasValue() && !isAllSelected()">
                        </mat-checkbox>
                    </th>
                    <td mat-cell *matCellDef="let row">
                        <mat-checkbox (click)="$event.stopPropagation()"
                            (change)="$event ? rowToggle(row) : null"
                            [checked]="selection.isSelected(row)">
                        </mat-checkbox>
                    </td>
                </ng-container>

                <!-- Amount Column -->
                <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef> Amount </th>
                    <td mat-cell *matCellDef="let element">
                        <mat-form-field floatLabel="never">
                            <input matInput type="number" (change)="updateAmount(element, form.value)" placeholder="{{element.amount}}" [ngModel]="amount" name="amount">
                        </mat-form-field>
                    </td>
                </ng-container>

                <!-- Watt Column -->
                <ng-container matColumnDef="watt">
                    <th mat-header-cell *matHeaderCellDef> Watt Total </th>
                    <td mat-cell *matCellDef="let element"> {{element.watt}} </td>
                </ng-container>

                <!-- Kelvin Column -->
                <ng-container matColumnDef="kelvin">
                    <th mat-header-cell *matHeaderCellDef> Kelvin </th>
                    <td mat-cell *matCellDef="let element"> {{element.kelvin}} </td>
                </ng-container>

                <!-- Lumen Column -->
                <ng-container matColumnDef="lumen">
                    <th mat-header-cell *matHeaderCellDef> Lumen </th>
                    <td mat-cell *matCellDef="let element"> {{element.lumen}} </td>
                </ng-container>

                <!-- Replace Column -->
                <ng-container matColumnDef="replace">
                    <th mat-header-cell *matHeaderCellDef> Replace </th>
                    <td mat-cell *matCellDef="let element"> {{element.replace}} </td>
                </ng-container>

                <!-- Base Price Column -->
                <ng-container matColumnDef="basePrice">
                    <th mat-header-cell *matHeaderCellDef> Price </th>
                    <td mat-cell *matCellDef="let element"> NOK {{element.basePrice}},- </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
            </mat-dialog-content>
            <mat-dialog-actions>
                <button mat-button type="submit">Add Selected</button>
                <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
            </mat-dialog-actions>
        </form>
        `
})
export class ProductDialogComponent implements OnInit {

    displayedColumns: string[] = ['select', 'amount', 'watt', 'kelvin', 'lumen', 'replace', 'basePrice'];
    element_data: ProductOption[] = [];
    selection = new SelectionModel<ProductOption>(true, []);
    dataSource: MatTableDataSource<ProductOption>;

    
    constructor(
        private dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data
    ) {}
    
     //Whether the number of selected elements matches the total number of rows
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    //Selects all rows if they are not all selected; otherwise clear selection
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
      }

    rowToggle(row) {
        this.selection.toggle(row);        
        console.log(this.selection.isSelected(row))
    }

    updateAmount(data, value) {
        var elementExists = false;
        var dataIndex = -1;
        for (var i = 0; i < this.dataSource.data.length; i++)
        {
            if (data.id == this.dataSource.data[i].id) {
                dataIndex = i;
                elementExists = true;
                break;
            };  
        }
        
        if (elementExists && dataIndex != -1) {
            this.dataSource.data[dataIndex].amount = parseInt(value.amount);
        }
    }

    ngOnInit() {
        this.element_data = this.data.element_data;
        this.dataSource = new MatTableDataSource<ProductOption>(this.element_data);
    }
    
    submit(values) {
        this.dialogRef.close(this.selection.selected);
    }
}
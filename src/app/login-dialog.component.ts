import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from './rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { headersToString } from 'selenium-webdriver/http';
import { Http2ServerRequest } from 'http2';

@Component({
    template: `
        <form [formGroup]="form" (ngSubmit)="submit(form)">
            <h1 mat-dialog-title>Log in</h1>
            <mat-dialog-content>
                <mat-form-field>
                <input matInput formControlName="username" [(ngModel)]="username" placeholder="Enter username" (ngOnInit)="username(form)">
                    </mat-form-field>
            </mat-dialog-content>
            <mat-dialog-content>
            <mat-form-field>
            <input matInput formControlName="password" type="password" placeholder="Enter password" (ngOnInit)="password(form)">
            </mat-form-field>
            </mat-dialog-content>
            <mat-dialog-actions>
                <button mat-button type="submit">Log in</button>
                <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
            </mat-dialog-actions>
        </form>
    `
})
export class LoginDialogComponent implements OnInit {

    form: FormGroup;

    username: string;
    password: string;

    constructor(
        public rest:RestService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
          username: this.data.username ? this.data.username : '',
          password: this.data.password ? this.data.password : ''
        })
    }
    
    submit(form:any) {
        this.rest.login(form.value.username, form.value.password).subscribe(
            res => {
              console.log(res);
              this.rest.setNewHeader('Authorization', res.token);
            },
            err => {
              console.log("Error occured: ", err);
            }
        );
        this.dialogRef.close(`${form.value.username.password}`);
    }
}
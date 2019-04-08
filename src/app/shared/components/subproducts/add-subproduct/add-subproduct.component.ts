import { Component, OnInit, Inject, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '../../../utils/globals';
import { Product } from '../../../utils/entities/product.entity';

@Component({
  selector: 'app-add-subproduct',
  templateUrl: './add-subproduct.component.html',
  styleUrls: ['./add-subproduct.component.css']
})
export class AddSubproductComponent implements OnInit {
  form: FormGroup;

  productNumber: string;
  title: string;
  description: string;
  watt: number;
  kelvin: number;
  lumen: number;
  price: number;

  constructor(public rest: RestService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSubproductComponent>,
    public global: Globals,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      productNumber: this.data.productNumber ? this.data.title : '',
      title: this.data.title ? this.data.title : '',
      description: this.data.description ? this.data.description : '',
      watt: this.data.watt ? this.data.watt : '',
      kelvin: this.data.kelvin ? this.data.kelvin : '',
      lumen: this.data.lumen ? this.data.lumen : '',
      price: this.data.price ? this.data.price : ''
    });
  }

  submit(form: any) {
    this.rest.httpPost('subproduct', {
      "productNumber": form.value.productNumber,
      "title": form.value.title,
      "description": form.value.description,
      "watt": form.value.watt,
      "image": form.value.description,
      "kelvin": form.value.kelvin,
      "lumen": form.value.lumen,
      "price": form.value.price,
      "idProduct": this.data.idProduct 
    }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
    this.dialogRef.close(true);
  }
}

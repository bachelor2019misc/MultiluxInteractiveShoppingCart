import { Component, OnInit, Inject, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '../../../utils/globals';
import { Product } from '../../../models/product.model';
import { SubProduct } from '../../../models/sub-product.model';
import { SubproductService } from '../../../services/subproduct/subproduct.service';

@Component({
  selector: 'app-edit-subproduct',
  templateUrl: './edit-subproduct.component.html',
  styleUrls: ['./edit-subproduct.component.css']
})
export class EditSubproductComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditSubproductComponent>,
    private subproductService: SubproductService,
    public global: Globals,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    let sb: SubProduct = this.data.subproduct;
    this.form = this.formBuilder.group({
      productNumber: sb.productNumber ? sb.productNumber : '',
      title: sb.title ? sb.title : '',
      description: sb.description ? sb.description : '',
      watt: sb.watt ? sb.watt : '',
      kelvin: sb.kelvin ? sb.kelvin : '',
      lumen: sb.lumen ? sb.lumen : '',
      price: sb.price ? sb.price : ''
    });
  }

  submit(form: any) {
    let subproduct: SubProduct = form.value;
    subproduct.idSubproduct = this.data.subproduct.idSubproduct;
    subproduct.idProduct = this.data.subproduct.idProduct;

    console.log(subproduct);
    console.log(this.subproductService);

    this.subproductService.update(subproduct).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close(true);
      },
      err => {
        console.log("Error occured: ", err);
        this.dialogRef.close(true);
      }
    );
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../../../utils/globals';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;

  image: any;
  title: string;
  description: string;

  constructor(
    public rest: RestService,
    public global: Globals,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.getProduct();
    this.form = this.formBuilder.group({
      title: this.title ? this.title : '',
      description: this.description ? this.description : ''
    })
    this.image = this.image;
  }

  getProduct() {
    this.rest.httpGet('product/' + this.data.idProduct).subscribe(
      res => {
        console.log(res);
        this.title = res.title;
        this.description = res.description;
        this.image = res.image;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  submit(form: any) {
    this.rest.httpPut('product/' + this.data.idProduct, {"title" : form.value.title,"description" : form.value.description, "hidden" : false, "image" : this.image}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
    this.dialogRef.close(true);
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.image = (<FileReader>event.target).result;
        console.log("Image: ", this.image);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

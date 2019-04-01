import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '../../../utils/globals';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;

  image: any;
  title: string;
  description: string;

  constructor(public rest: RestService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewProductComponent>,
    public global: Globals,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: this.data.title ? this.data.title : '',
      description: this.data.description ? this.data.description : ''
    });
    this.image = "assets/img/vesselPlaceholder.png";
  }

  submit(form: any) {
    this.rest.httpPost('product', {
      "title": form.value.title,
      "description": form.value.description,
      "image": this.image
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

  readImageUrl(event: any) {
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

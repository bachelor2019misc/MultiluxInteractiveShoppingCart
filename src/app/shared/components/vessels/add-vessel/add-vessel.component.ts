import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-vessel',
  templateUrl: './add-vessel.component.html',
  styleUrls: ['./add-vessel.component.css']
})
export class AddVesselComponent implements OnInit {
  form: FormGroup;

  imageVessel: any;
  imageBlueprint: any;
  title: string;
  description: string;

  constructor(
    public rest: RestService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddVesselComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: this.data.title ? this.data.title : '',
      description: this.data.description ? this.data.description : ''
    })
    this.imageVessel = "assets/img/vesselPlaceholder.png";
    this.imageBlueprint = "assets/img/vesselPlaceholder.png";
  }

  submit(form: any) {
    this.rest.httpPost('vessel', {
      "title": form.value.title,
      "description": form.value.description,
      "hidden": false,
      "imageVessel": this.imageVessel,
      "imageBlueprint": this.imageBlueprint
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

  readVesselUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.imageVessel = (<FileReader>event.target).result;
        console.log("Image: ", this.imageVessel);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readBlueprintUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.imageBlueprint = (<FileReader>event.target).result;
        console.log("Image: ", this.imageBlueprint);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

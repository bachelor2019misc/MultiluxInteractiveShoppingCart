import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../../../utils/globals';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  form: FormGroup;

  image: any;
  title: string;
  description: string;

  constructor(
    public rest: RestService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRoomComponent>,
    public global: Globals,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: this.data.title ? this.data.title : '',
      description: this.data.description ? this.data.description : ''
    })
    this.image = "assets/img/vesselPlaceholder.png";
  }

  submit(form: any) {
    this.rest.httpPost('blueprintdot', {
      "title": form.value.title,
      "description": form.value.description,
      "image": this.image,
      "hidden": true,
      "xCoordinates": Math.floor(Math.random() * 1400) + 1,
      "yCoordinates": Math.floor(Math.random() * 700) + 1,
      "idVessel": this.global.currentSelectedVessel.idVessel
    }).subscribe(
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

  readRoomUrl(event: any) {
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

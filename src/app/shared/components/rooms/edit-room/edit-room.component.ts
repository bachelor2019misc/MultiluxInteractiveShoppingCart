import { Component, OnInit, Inject, Input } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../../../utils/globals';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  @Input() room;
  form: FormGroup;
  
  image: any;
  title: string;
  description: string;

  constructor(
    public rest: RestService,
    public global: Globals,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) private data
    
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: this.data.title ? this.data.room.title : '',
      description: this.data.description ? this.data.room.description : ''
    })
    this.image = this.data.room.image;
  }

  submit(form: any) {
    this.rest.httpPut('room/' + this.data.room.idRoom, {"title" : form.value.title,"description" : form.value.description, "hidden" : false, "image" : this.image}).subscribe(
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


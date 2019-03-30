import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../../../../utils/globals';

@Component({
  selector: 'app-edit-blueprint',
  templateUrl: './edit-blueprint.component.html',
  styleUrls: ['./edit-blueprint.component.css']
})
export class EditBlueprintComponent implements OnInit {
  form: FormGroup;

  image: any;

  constructor(
    public rest: RestService,
    private global: Globals,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditBlueprintComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.image = this.global.currentSelectedBlueprint.image;
  }

  submit(form: any) {
    this.rest.httpPut('blueprint/' + this.global.currentSelectedBlueprint.idBlueprint, {"image" : this.image}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error:", err);
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

import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { headersToString } from 'selenium-webdriver/http';
import { Http2ServerRequest } from 'http2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  username: string;
  password: string;

  constructor(
    public rest: RestService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.data.username ? this.data.username : '',
      password: this.data.password ? this.data.password : ''
    })
  }

  submit(form: any) {
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

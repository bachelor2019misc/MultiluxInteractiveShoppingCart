import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { headersToString } from 'selenium-webdriver/http';
import { Http2ServerRequest } from 'http2';
import { Globals } from '../../utils/globals';
import { LoginService } from '../../services/login/login.service';

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
    public loginService: LoginService,
    public global: Globals,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.data.username ? this.data.username : '',
      password: this.data.password ? this.data.password : ''
    })
  }

  submit(form: any) {
    this.loginService.login(form.value.username, form.value.password);
    this.dialogRef.close();
  }
}

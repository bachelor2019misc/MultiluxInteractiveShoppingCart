import { Component, Inject } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Globals } from '../../utils/globals';

//Code for password validation from https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public rest: RestService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private global: Globals,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
   }

  checkPasswords(group: FormGroup) {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}

  submit(form: any) {
    var username = form.value.username;
    var password = form.value.password;

    //Check if contains characters
    if (!/\S/.test(username)) {
      username = "";
      console.log("username was empty");
    }
    if (!/\S/.test(password)) {
      password = "";
      console.log("password was empty");
    }


    this.rest.editUser(this.global.username, username, password).subscribe(
      res => {
        console.log(res);
        if (username != "") {
          this.global.username = form.value.username;
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
    this.dialogRef.close(`${form.value.username.password}`);
  }
}
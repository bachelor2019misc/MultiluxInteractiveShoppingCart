import { Component } from '@angular/core';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import { LoginDialogComponent } from './login-dialog.component';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  fileNameDialogRef: MatDialogRef<LoginDialogComponent>;
  
  files = [
    { name: 'foo.js', content: ''},
    { name: 'bar.js', content: ''}
  ];

  constructor(private dialog: MatDialog) {}

  openAddFileDialog(file?) {
    this.fileNameDialogRef = this.dialog.open(LoginDialogComponent, {
      data: {
        filename: file ? file.name : ''
      }
    });

    this.fileNameDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(name => {
      if (file) {
        const index = this.files.findIndex(f => f.name == file.name);
        if (index !== -1) {
          this.files[index] = { name, content: file.content }
        }
      } else {
        this.files.push({ name, content: ''});
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthService) { }
  hide = true;
  login = "";

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.pass.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signin() {
    console.log("sign in");


    this.auth.login(this.email.value, this.pass.value).catch(err => console.log(err.message));

    /*this.angularFireAuth.signIn
    autWithEmailAndPassword(this.email.value, this.pass.value)
      .then((user) => {
        console.log("zalogowano");
      })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });*/
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}

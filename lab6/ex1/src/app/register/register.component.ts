import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthService) { }
  hide = true;

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  pass1 = new FormControl('', [Validators.required]);
  pass2 = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.pass1.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register() {
    console.log("register in");

    this.auth.register(this.email.value, this.pass1.value).catch(err => console.log(err.message));

  }

  checkValidData() {
    return this.email.valid && this.pass1.value && this.pass2.valid &&
      this.userName.valid && this.firstName.valid && this.lastName.valid;
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}


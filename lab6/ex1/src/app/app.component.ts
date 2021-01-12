import { AfterViewInit, Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CartComponent, CartElement } from './cart/cart.component';
import { DbService } from './db.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Tour } from './tour/tour.component';
import {tours} from './tours'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ex7';;
  constructor(
    public serverService: DbService, 
    public dialog: MatDialog, 
    private angularFireAuth: AngularFireAuth, 
    private firebase: FirebaseApp,
    private auth: AuthService) {
    angularFireAuth.authState.subscribe(auth => console.log(auth?.displayName));
  }
  
  Username : Observable<string> | undefined;


  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this.ifLoggedIn = this.ifLogged();
  }

  register() {
    
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this.ifLoggedIn = this.ifLogged();
  }

  logout() {
    this.auth.logout();
   // this.ifLoggedIn = this.ifLogged();
   //this.auth.getLogged().subscribe(a => this.ifLoggedIn = a?.email);
  }

  ifLogged() {
    //console.log(this.auth.getLogged().subscribe(a => console.log(a?.email)));
    return false;
    //console.log(this.firebase.auth().currentUser);
    /*this.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("OK " + user);
      } else {
        // No user is signed in.
      }
    });*/
  }

  islogged() {
    return this.auth.user == null;
  }

  ngOnInit(): void {
  }
}




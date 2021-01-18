import { AfterViewInit, Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  userEmail = '';
  islogged = false;
  //userData?: User | null;
  
  title = 'ex7';;
  constructor(
    public serverService: DbService, 
    public dialog: MatDialog, 
    private angularFireAuth: AuthService, 
    private firebase: FirebaseApp,
    private auth: AuthService,
    private router: Router) {
      this.angularFireAuth.getLogged().subscribe(auth => {
        if (auth){
          this.islogged = true;
          this.userEmail = auth.email;
          /*this.islogged.getUser(this.email).subscribe(user => {
            this.userData = user;
            localStorage.setItem('loggedUser', JSON.stringify(user));
          });*/
        }else{
          this.islogged = false;
          this.userEmail = '';
          //this.userData = null;
          //localStorage.setItem('loggedUser', '');
        }
      });
  }
  


  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.auth.logout();
  }

  userMenu() {
    this.router.navigate(['userpanel-component']);
  }

  ngOnInit(): void {
  }
}




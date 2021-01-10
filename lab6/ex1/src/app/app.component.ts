import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
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
  
  title = 'ex7';

  constructor(public serverService: DbService, public dialog: MatDialog) {
    
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

  ngOnInit(): void {
  }
}




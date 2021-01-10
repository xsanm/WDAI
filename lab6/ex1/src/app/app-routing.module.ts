import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingComponent } from './adding/adding.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'shop-component', component: ShopComponent },
  { path: 'adding-component', component: AddingComponent },
  { path: 'cart-component', component: CartComponent },
  { path: 'details-component', component: DetailsComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'register-component', component: RegisterComponent },
  { path: '**', component: ShopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

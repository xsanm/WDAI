import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { CartComponent, CartElement } from './cart/cart.component';
import { Tour } from './tour/tour.component';
import { tours } from './tours';

@Injectable({
  providedIn: 'root'
})
export class DbService {


  private toursPath = 'tours';
  private cartPath = 'cart';
  toursRef: AngularFireList<Tour>;
  cartRef: AngularFireList<CartElement>;
  cart: CartElement[] = [];

  constructor(private db: AngularFireDatabase) {
    this.toursRef = db.list(this.toursPath);
    this.cartRef = db.list(this.cartPath);
    this.updateLocalCartList();
  }

  getToursList()  {
    return this.toursRef;
  }

  deleteTour(key: string) {
    this.toursRef.remove(key);
  }
  
  updateRate(key: string, value: any) {
    this.toursRef.update(key, value);
  } 

  createTour(tour: Tour): void {
    this.toursRef.push({...tour})
  }

  getCartList()  {
    return this.cartRef;
  }

  updateLocalCartList(){
    this.cartRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(cart =>{
      this.cart = cart as CartElement[];
    });
  }


  addToCart(tour: CartElement, el: number): void {
    this.updateLocalCartList();
    //console.log(tour);
    //console.log(this.cart);

    for(let c of this.cart) {
      if(c.id === tour.id) {
        this.cartRef.update(c.key, { elements: el });
        return;
      }
    }
    //(if(this.cart.includes(tour)) {
    //  this.cartRef.update(tour.key, { elements: tour.elements + 1 });
    //} else {
      this.cartRef.push({...tour})
    //}
    
  }

  deleteFromCart(tour: CartElement, el: number): void {
    this.updateLocalCartList();
    //console.log(tour);
    //console.log(this.cart);

    for(let c of this.cart) {
      if(c.id === tour.id) {
        this.cartRef.update(c.key, { elements: el });
        if(el == 0){
          this.cartRef.remove(c.key);
        }
      }
    }
    
  }

  ifInCart(tour: CartElement) {

  }

  getCartElements(id: number) {
    for(let c of this.cart) {
      if(c.id === id) {
        return c.elements;
      }
    }
    return 0;
  }



}

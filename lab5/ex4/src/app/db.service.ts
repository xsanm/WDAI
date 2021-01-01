import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { CartComponent, CartElement } from './cart/cart.component';
import { FilterRanges } from './fliter/fliter.component';
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
  tours: Tour[] = [];
  toursWithFilters: number[] = [];

  constructor(private db: AngularFireDatabase) {
    this.toursRef = db.list(this.toursPath);
    this.cartRef = db.list(this.cartPath);
    this.updateLocalCartList();
    this.updateLocalTourList();
    
    for(let t of this.tours) this.toursWithFilters.push(t.id);
  }

  getToursLocalList(): Tour[] {
    this.updateLocalTourList();
    return this.tours;
  }
  

  setFiltered(toursWithFilters: number[]) {
    console.log("siema");
    console.log(toursWithFilters);
    this.toursWithFilters = toursWithFilters;
  }

  ifToDisplay(id:number){
    //this.updateLocalTourList();
    return true;
    console.log(this.tours);
    console.log(this.toursWithFilters);
    return this.toursWithFilters.includes(id);
  }

  applyFilters(filters: FilterRanges) {

    for(let t of this.tours) {
      if((filters.destinations.length == 0 || filters.destinations.includes(t.destination)) &&
        t.money >= filters.minMoney &&
        t.money <= filters.maxMoney &&
        (filters.ratings.length == 0  || filters.ratings.includes(t.rate)) &&
        (filters.dateBeg == "" || new Date(t.dateBegin) >= new Date(filters.dateBeg)) &&
        (filters.dateEnd == "" || new Date(t.dateEnd) <= new Date(filters.dateEnd))
      
      
      ){
        t.display = true;
        //this.toursWithFilters.push(t.id);
        //tab.push(t.id);
      } else {
        t.display = false;
      }
    }
  }

  bookedTours() {
    let sum = 0;
    for(let c of this.cart) {
      sum += c.elements;
    }
    return sum;
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

  updateLocalTourList(){
    this.toursRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tour =>{
      this.tours = tour as Tour[];
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
    this.updateLocalTourList();
    this.updateLocalCartList();
    for(let c of this.cart) {
      if(c.id === id) {
        return c.elements;
      }
    }
    return 0;
  }


  getLeastExpensiveID() {
    this.updateLocalTourList();
    let id = 0;
    let mx = 0;
    for(let t of this.tours) {
      if(t.money > mx) {
        mx = t.money;
        id = t.id;
      }
    }
    return id;
  }
  getMostExpensiveID() {
    let id = 0;
    let mx = 1000000000;
    for(let t of this.tours) {
      if(t.money < mx) {
        mx = t.money;
        id = t.id;
      }
    }
    return id;
  }


}

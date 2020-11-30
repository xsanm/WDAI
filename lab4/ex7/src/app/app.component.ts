import { AfterViewInit, Component } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { Tour } from './tour/tour.component';

import {tours} from './tours'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'ex7';
  toursData: Tour[];
  bookedTours: number = 0;
  maxPriceId: number;
  minPriceId: number;
  
  cart: CartElement[] = [];
  cartSum: number = 0;

  constructor() {
    this.toursData = tours;
    this.minPriceId = 0;
    this.maxPriceId = 0
    this.setMinMax();
    
  }

  setMinMax() {
    this.maxPriceId = this.toursData[0].id;
    let maxMoney = this.toursData[0].money;
    this.minPriceId = this.toursData[0].id;
    let minMoney = this.toursData[0].money;
    for(let t of this.toursData) {
        if(t.money < minMoney) {
          minMoney = t.money;
          this.minPriceId = t.id;
        }
        if(t.money > maxMoney) {
          maxMoney = t.money;
          this.maxPriceId = t.id;
        }
    }
    //console.log(this.minPriceId, this.maxPriceId);
  }

  ngAfterViewInit(): void {
    //this.setMinMax()
    
  }


  addToBasket(e: Tour){
    this.bookedTours += 1;
    this.cartSum += e.money;
    let is = false;
    for(let c of this.cart) {
      if(c.id == e.id) {
        c.elements += 1;
        is = true;
      }
    }
    if(!is) {
      this.cart.push({
        id: e.id,
        name: e.name,
        money: e.money,
        elements: 1
      });
    }
    //console.log(this.cart);
  }

  removeFromBasket(e: Tour){
    this.bookedTours -= 1;
    this.cartSum -= e.money;
    for(let c = 0; c < this.cart.length; c++) {
      if(this.cart[c].id == e.id) {
        this.cart[c].elements -= 1;
        if(this.cart[c].elements == 0) {
          this.cart.splice(c, 1);
        }
      }
    }
    //console.log(this.cart);

  }

  deleteTour(e: string) {
    this.setMinMax();
    //console.log(e);
    //console.log(this.toursData);
  }
  addTour(e: Tour) {
    e.id = this.toursData[this.toursData.length - 1].id + 1;
    //console.log("id", e.id);
    this.toursData.push(e);
    this.setMinMax()
  }
}

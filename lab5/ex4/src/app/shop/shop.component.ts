import { Component, OnInit } from '@angular/core';
import { tours } from '../tours';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  title = 'ex7';
  toursData: Tour[]= tours;
  bookedTours: number = 0;
  maxPriceId: number;
  minPriceId: number;
  
  cart: CartElement[] = [];
  cartSum: number = 0;

  constructor() {
    this.toursData = tours;
    this.minPriceId = 0;
    this.maxPriceId = 0
    //this.setMinMax();
    
  }



  ngOnInit(): void {
  }

}

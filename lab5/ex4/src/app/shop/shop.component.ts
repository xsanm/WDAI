import { Component, OnInit } from '@angular/core';
import { tours } from '../tours';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { DbService } from '../db.service';
import { CartElement } from '../cart/cart.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  title = 'ex7';
  toursData: Tour[];
  bookedTours: number = 0;
  maxPriceId: number;
  minPriceId: number;
  
  cart: CartElement[] = [];
  cartSum: number = 0;

  constructor(private serverService: DbService) {
    this.minPriceId = 0;
    this.maxPriceId = 0
    //this.setMinMax();
    this.getToursList();
  }

  getToursList() {
    this.serverService.getToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.toursData = tours;
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { tours } from '../tours';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { DbService } from '../db.service';
import { CartElement } from '../cart/cart.component';
import { map } from 'rxjs/operators';
import { Tour } from '../tour/tour.component';
import { FilterRanges, FliterComponent } from '../fliter/fliter.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  title = 'ex7';
  toursData: Tour[] = [];
  bookedTours: number = 0;
  maxPriceId: number = 0;
  minPriceId: number = 0;
  
  cart: CartElement[] = [];
  cartSum: number = 0;
  @ViewChild(FliterComponent) filter!:FliterComponent ;


  constructor(public serverService: DbService) {
    this.minPriceId = 0;
    this.maxPriceId = 0
    this.getToursList();
  }

  getToursList() {
    this.serverService.getToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.toursData = tours as Tour[];
      this.filter.setTours(this.toursData);
    });
    
  }
  getBookedTours() {
    return this.serverService.bookedTours();
  }
  getMostExpensiveID() {
    return this.serverService.getMostExpensiveID();
  }
  getLeastExpensiveID() {
    return this.serverService.getLeastExpensiveID();
  }

  returnToursList(){
    //this.getToursList();
    console.log(this.toursData);
    return this.toursData;
  }

  useFilters() {
    this.getToursList();
  }

  


  ngOnInit(): void {
    this.minPriceId = this.serverService.getLeastExpensiveID();
    this.maxPriceId = this.serverService.getMostExpensiveID();
    //console.log(this.minPriceId);
  }

}

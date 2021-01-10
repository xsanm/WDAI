import { Injectable } from '@angular/core';
import { Tour } from './tour/tour.component';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  cartTours: Tour[] = [];

  constructor() { }

  addTour(t : Tour) {
      this.cartTours.push(t);
  }

  removeTour(t : Tour) {
    //this.cartTours.
  }

  getTours() {
    return this.cartTours;
  }

}













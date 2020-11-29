import { Component } from '@angular/core';
import { Tour } from './tour/tour.component';

import {tours} from './tours'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ex7';
  toursData: Tour[];
  bookedTours: number = 0;

  constructor() {
    this.toursData = tours;
  }

  changeBookedTours(e: number){
    this.bookedTours += e;
  }
}

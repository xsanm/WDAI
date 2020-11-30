import { AfterViewInit, Component } from '@angular/core';
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

  changeBookedTours(e: number){
    this.bookedTours += e;
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

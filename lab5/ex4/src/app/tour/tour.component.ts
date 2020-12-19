import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { tours } from '../tours';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

export {Tour};

interface Tour {
  id: number,
  name: string,
  destination: string,
  dateBegin: string,
  dateEnd: string,
  imageURL: string,
  places: number,
  money: number,
  description: string,
  display: boolean,
  rate: number
}



@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {


  
  @Input() tourData: Tour;
  @Input() maxPriceId: number = 0;
  @Input() minPriceId: number = 0;
  @Output() addTourToBasket = new EventEmitter();
  @Output() removeTourFromBasket = new EventEmitter();
  @Output() delTour = new EventEmitter();
  placesReserved: number = 0;
  displayMinusButton: boolean = false;
  displayPlusButton: boolean = true;
  displayDeleteButton: boolean = true;
  tourRating: number = 1;

  constructor() {
    
  }

  ngOnInit(): void {
  }

  incrementPlaces() {
    if(this.placesReserved < this.tourData.places) {
      this.placesReserved += 1;
      this.addTourToBasket.emit(this.tourData);
      if(this.placesReserved > 0) this.displayMinusButton = true;
      if(this.placesReserved == this.tourData.places) this.displayPlusButton = false;
    }
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      this.removeTourFromBasket.emit(this.tourData);
      if(this.placesReserved == 0 ) {
        this.displayMinusButton = false;
      }
      if(this.placesReserved < this.tourData.places) this.displayPlusButton = true;
    }
  }

  setRate(e:number) {
    this.tourData.rate = e;
  }

  deleteTour(e: number) {
    console.log(tours);
    
   
    for(let i = 0; i < tours.length; i++) {
      if(tours[i].id == e) {
        //console.log(tours[i]);
        //delete tours[i];
        tours.splice(i, 1);
        while(this.placesReserved > 0) {
          this.decrementPlaces();
        }
        this.delTour.emit(e);
      }
    }
    console.log(tours);
  }
}

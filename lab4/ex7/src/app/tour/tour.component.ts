import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { tours } from '../tours';

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
  description: string
}



@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  
  @Input() tourData: Tour;
  @Input() maxPriceId: number;
  @Input() minPriceId: number;
  @Output() changeBookedTours = new EventEmitter();
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
      this.changeBookedTours.emit(1);
      if(this.placesReserved > 0) this.displayMinusButton = true;
      if(this.placesReserved == this.tourData.places) this.displayPlusButton = false;
    }
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      this.changeBookedTours.emit(-1);
      if(this.placesReserved == 0 ) {
        this.displayMinusButton = false;
      }
      if(this.placesReserved < this.tourData.places) this.displayPlusButton = true;
    }
  }

  setRate(e:number) {
    this.tourRating = e;
  }

  deleteTour(e) {
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
    //console.log(tours);
  }
}

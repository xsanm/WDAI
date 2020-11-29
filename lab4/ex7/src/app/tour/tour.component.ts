import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

export {Tour};

interface Tour {
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

  constructor() { }
  @Input() tourData: Tour;
  @Output() changeBookedTours = new EventEmitter();
  placesReserved: number = 0;
  displayMinusButton: boolean = false;
  displayPlusButton: boolean = true;
  displayDeleteButton: boolean = true;

  ngOnInit(): void {
  }

  incrementPlaces() {
    if(this.placesReserved < this.tourData.places) {
      this.placesReserved += 1;
      if(this.placesReserved == 1) this.changeBookedTours.emit(1);
      if(this.placesReserved > 0) this.displayMinusButton = true;
      if(this.placesReserved == this.tourData.places) this.displayPlusButton = false;
    }
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      if(this.placesReserved == 0 ) {
        this.changeBookedTours.emit(-1);
        this.displayMinusButton = false;
      }
      if(this.placesReserved < this.tourData.places) this.displayPlusButton = true;
    }
  }
}

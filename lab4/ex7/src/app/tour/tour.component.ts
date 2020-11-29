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

  ngOnInit(): void {
  }

  incrementPlaces() {
    this.placesReserved += 1;
    this.changeBookedTours.emit(1);
  }

  decrementPlaces() {
    this.placesReserved -= 1;
    this.changeBookedTours.emit(-1);
  }
}

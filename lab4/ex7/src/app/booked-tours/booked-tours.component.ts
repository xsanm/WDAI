import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-booked-tours',
  templateUrl: './booked-tours.component.html',
  styleUrls: ['./booked-tours.component.css']
})
export class BookedToursComponent implements OnInit {

  @Input() bookedTours: number;
  constructor() { 
    this.bookedTours = 0;
  }

  ngOnInit(): void {
  }

}

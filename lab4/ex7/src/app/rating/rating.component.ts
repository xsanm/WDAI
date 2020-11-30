import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  @Input() rateVal: number = 0;
  @Output() setRate = new EventEmitter();

  ngOnInit(): void {
  }

  rate(e: number){
    this.setRate.emit(e);
  }



}

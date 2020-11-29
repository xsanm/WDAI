import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  onHoverElements = 0;

  ngOnInit(): void {
  }

  rate(e){
    console.log("Rate " + e);
  }

}

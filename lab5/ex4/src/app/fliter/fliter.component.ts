import { Component, Input, OnInit, Pipe, NgModule, Output, EventEmitter } from '@angular/core';
import { Tour } from '../tour/tour.component';
import { BrowserModule } from '@angular/platform-browser'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fliter',
  templateUrl: './fliter.component.html',
  styleUrls: ['./fliter.component.css']
})
export class FliterComponent implements OnInit {



  @Input() tours : Tour[] = [];
  @Output() setMinMax2 = new EventEmitter();

  toppings = new FormControl();
  toppingList: string[] = [];

  destinations: string[] = []
  ratings: number[] = []
  choosedDestinations: string[] = []
  choosedRatings: number[] = []
  minMoney:number = 10
  maxMoney:number = 100
  choosedMinMoney: number = 0;
  choosedMaxMoney: number = 0;
  value1 = 40;
  value2 = 40;
  dateSent = new Date;
  dateSent2 = new Date;
  dateBeg: string = "";
  dateEnd: string = "";
  
  constructor() {
    

  }

  countRanges() {
    for(let t of this.tours) if(t.display){
      if(!this.destinations.includes(t.destination)) 
        this.destinations.push(t.destination);
      if(!this.ratings.includes(t.rate)) 
        this.ratings.push(t.rate);
      if(t.money > this.maxMoney) {
        this.maxMoney = t.money;
      }
      if(t.money < this.minMoney) {
        this.minMoney = t.money;
      }
    }
    //console.log(this.ratings);
    this.choosedMinMoney = this.minMoney;
    this.choosedMaxMoney = this.maxMoney;
  }

  deleteRanges() {
    this.destinations = [];
    this.ratings = [];
    this.dateBeg=  "";
    this.dateEnd = "";
    this.dateSent = new Date;
    this.dateSent2 = new Date;
    this.ngOnInit();
  }
  
  ngOnInit(): void {
    //console.log(this.tours);
    this.countRanges();
    this.dateSent = new Date;
    this.dateSent2 = new Date;

  }

  onDestinationFilterChange(e: any){
    let dest = e.target.name ;
    if(e.target.checked){
      this.choosedDestinations.push(dest);
     
    } else {
      for(let i = 0; i < this.choosedDestinations.length; i++) {
        if(this.choosedDestinations[i] == dest) {
          //console.log(tours[i]);
          //delete tours[i];
          this.choosedDestinations.splice(i, 1);
        }
      }
    }
    this.apllyFilters();
  }

  apllyFilters() {

    let tab: number[] =[];
    //console.log(this.choosedRatings, this.choosedDestinations);
    //console.log(this.dateBeg, this.tours[0].dateBegin);
    for(let t of this.tours) {
      if((this.choosedDestinations.length == 0 || this.choosedDestinations.includes(t.destination)) &&
        t.money >= this.choosedMinMoney &&
        t.money <= this.choosedMaxMoney &&
        (this.choosedRatings.length == 0  || this.choosedRatings.includes(t.rate)) &&
        (this.dateBeg == "" || new Date(t.dateBegin) >= new Date(this.dateBeg)) &&
        (this.dateEnd == "" || new Date(t.dateEnd) <= new Date(this.dateEnd))
      
      
      ){
        t.display = true;
        tab.push(t.id);
      } else {
        t.display = false;
      }
    }

    this.setMinMax2.emit(tab);

    //this.countRanges();
  }

  removeFilters() {
    for(let t of this.tours) {
      t.display = true;
    }
    this.deleteRanges();
    this.countRanges();
  }

  changeMinMoney(e: any) {
      //console.log(e.target.value);
      this.value1 = parseInt(e.target.value);
      this.choosedMinMoney = parseInt(e.target.value);
      this.apllyFilters();
  }

  changeMaxMoney(e: any) {
    //console.log(typeof e.target.value);
    this.value2 = parseInt(e.target.value);
    this.choosedMaxMoney = parseInt(e.target.value);
    this.apllyFilters();
}

selectRating(ev: any, e: number) {
    if(ev.target.checked){
      this.choosedRatings.push(e);
    } else {
      for(let i = 0; i < this.choosedRatings.length; i++) {
        if(this.choosedRatings[i] == e) {
          this.choosedRatings.splice(i, 1);
        }
      }
    }
  this.apllyFilters();
  }

  dateBeginChange(e: any) {
    this.dateBeg = e.target.value;
    this.dateSent2 = e.target.value;
    this.apllyFilters();
  }

  dateEndChange(e: any) {
    this.dateEnd = e.target.value;
    this.apllyFilters();
  }



}

import { Component, Input, OnInit, Pipe, NgModule, Output, EventEmitter } from '@angular/core';
import { Tour } from '../tour/tour.component';
import { BrowserModule } from '@angular/platform-browser'
import { FormControl } from '@angular/forms';
import { DbService } from '../db.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface FilterRanges {
  destinations: string[],
  ratings: number[],
  minMoney:number,
  maxMoney:number,
  dateBeg: string ,
  dateEnd: string
}

@Component({
  selector: 'app-fliter',
  templateUrl: './fliter.component.html',
  styleUrls: ['./fliter.component.css']
})
export class FliterComponent implements OnInit {

  @Input() tours : Tour[] = [];
  @Output() useFilters = new EventEmitter();

  toursWithFilters: number[] = []

  filters!: FilterRanges;

  destinations: string[] = []
  ratings: number[] = []
  //choosedDestinations: string[] = []
  //: number[] = []
  minMoney:number = 1000000
  maxMoney:number = 0
  //choosedMinMoney: number = 0;
  //choosedMaxMoney: number = 0;
  value1 = 67;
  value2 = 3255;
  dateSent = new Date;
  dateSent2 = new Date;
  //dateBeg: string = "";
  //dateEnd: string = "";
  
  constructor(private dbService: DbService, private router: Router) {
    this.filters = {
      destinations: [],
      ratings: [],
      minMoney: 100000,
      maxMoney: 0,
      dateBeg: "" ,
      dateEnd: ""
    }

    
  }

  setTours(tours: Tour[]) {
    this.tours = tours;
    this.countRanges();
  }

  countRanges() {
    this.toursWithFilters = this.dbService.getToDisplayList();
    for(let t of this.tours) {
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
    this.filters.minMoney = this.minMoney;
    this.filters.maxMoney = this.maxMoney;
  }

  deleteRanges() {
    this.destinations = [];
    this.ratings = [];
    this.dateSent = new Date;
    this.dateSent2 = new Date;
    this.ngOnInit();
  }
  
  ngOnInit(): void {
    this.countRanges();
    this.dateSent = new Date;
    this.dateSent2 = new Date;
    //console.log(this.tours);
  }

  onDestinationFilterChange(e: any){
    let dest = e.target.name ;
    if(e.target.checked){
      this.filters.destinations.push(dest);
     
    } else {
      for(let i = 0; i < this.filters.destinations.length; i++) {
        if(this.filters.destinations[i] == dest) {
          this.filters.destinations.splice(i, 1);
        }
      }
    }
    this.apllyFilters();
  }

  apllyFilters() {
    this.dbService.applyFilters(this.filters);
    this.useFilters.emit();
  }

  removeFilters() {
    this.dbService.resetFilters();
    this.useFilters.emit();
    //this.router.navigate(['adding-component']);
    //this.router.navigate(['shop-component']);
    location.reload();
    return;
    for(let t of this.tours) {
      this.toursWithFilters.push(t.id);
    }
    this.deleteRanges();
    this.countRanges();
  }

  changeMinMoney(e: any) {
      //console.log(e.target.value);
      this.value1 = parseInt(e.target.value);
      this.filters.minMoney = parseInt(e.target.value);
      this.apllyFilters();
  }

  changeMaxMoney(e: any) {
    //console.log(typeof e.target.value);
    this.value2 = parseInt(e.target.value);
    this.filters.maxMoney = parseInt(e.target.value);
    this.apllyFilters();
}

selectRating(ev: any, e: number) {
    if(ev.target.checked){
      this.filters.ratings.push(e);
    } else {
      for(let i = 0; i < this.filters.ratings.length; i++) {
        if(this.filters.ratings[i] == e) {
          this.filters.ratings.splice(i, 1);
        }
      }
    }
  this.apllyFilters();
  }

  dateBeginChange(e: any) {
    this.filters.dateBeg = e.target.value;
    this.dateSent2 = e.target.value;
    this.apllyFilters();
  }

  dateEndChange(e: any) {
    this.filters.dateEnd = e.target.value;
    this.apllyFilters();
  }



}

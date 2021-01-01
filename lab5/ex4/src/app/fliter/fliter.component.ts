import { Component, Input, OnInit, Pipe, NgModule, Output, EventEmitter } from '@angular/core';
import { Tour } from '../tour/tour.component';
import { BrowserModule } from '@angular/platform-browser'
import { FormControl } from '@angular/forms';
import { DbService } from '../db.service';
import { map } from 'rxjs/operators';

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
  minMoney:number = 10
  maxMoney:number = 100
  //choosedMinMoney: number = 0;
  //choosedMaxMoney: number = 0;
  value1 = 40;
  value2 = 40;
  dateSent = new Date;
  dateSent2 = new Date;
  //dateBeg: string = "";
  //dateEnd: string = "";
  
  constructor(private dbService: DbService) {
    this.filters = {
      destinations: [],
      ratings: [],
      minMoney: 0,
      maxMoney: 0,
      dateBeg: "" ,
      dateEnd: ""
    }
    //console.log(dbService.getToursList());
    /*this.dbService.getToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.tours = tours as Tour[];
    });*/
    
  }

  setTours(tours: Tour[]) {
    this.tours = tours;
    this.countRanges();
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
    this.filters.minMoney = this.minMoney;
    this.filters.maxMoney = this.maxMoney;
  }

  deleteRanges() {
    this.destinations = [];
    this.ratings = [];
    //this.dateBeg=  "";
    //this.dateEnd = "";
    this.dateSent = new Date;
    this.dateSent2 = new Date;
    this.ngOnInit();
  }
  
  ngOnInit(): void {
    //console.log(this.tours);
    this.countRanges();
    this.dateSent = new Date;
    this.dateSent2 = new Date;
    //for(let t of this.tours) this.toursWithFilters.push(t.id);
    //this.dbService.setFiltered(this.toursWithFilters);
    console.log(this.tours);
  }

  onDestinationFilterChange(e: any){
    let dest = e.target.name ;
    if(e.target.checked){
      this.filters.destinations.push(dest);
     
    } else {
      for(let i = 0; i < this.filters.destinations.length; i++) {
        if(this.filters.destinations[i] == dest) {
          //console.log(tours[i]);
          //delete tours[i];
          this.filters.destinations.splice(i, 1);
        }
      }
    }
    this.apllyFilters();
  }

  apllyFilters() {

    this.dbService.applyFilters(this.filters);
    this.useFilters.emit();
    console.log("SIEMA");
    return;

    let tab: number[] =[];
    this.toursWithFilters = [];
    //console.log(this.choosedRatings, this.choosedDestinations);
    //console.log(this.dateBeg, this.tours[0].dateBegin);
    for(let t of this.tours) {
      if((this.filters.destinations.length == 0 || this.filters.destinations.includes(t.destination)) &&
        t.money >= this.filters.minMoney &&
        t.money <= this.filters.maxMoney &&
        (this.filters.ratings.length == 0  || this.filters.ratings.includes(t.rate)) &&
        (this.filters.dateBeg == "" || new Date(t.dateBegin) >= new Date(this.filters.dateBeg)) &&
        (this.filters.dateEnd == "" || new Date(t.dateEnd) <= new Date(this.filters.dateEnd))
      
      
      ){
        //t.display = true;
        this.toursWithFilters.push(t.id);
        tab.push(t.id);
      } else {
        //t.display = false;
      }
    }

    this.dbService.setFiltered(this.toursWithFilters);

    this.useFilters.emit();


    //this.countRanges();
  }

  removeFilters() {
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

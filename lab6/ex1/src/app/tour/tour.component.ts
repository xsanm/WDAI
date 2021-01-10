import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { tours } from '../tours';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { DbService } from '../db.service';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';
import { CartElement } from '../cart/cart.component';

export {Tour};

interface Tour {
  key: string,
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

export interface TourData {
  tour: Tour,
  cart: CartElement
}



@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {


  
  @Input() tourData: any;
  @Output() addTourToBasket = new EventEmitter();
  @Output() removeTourFromBasket = new EventEmitter();
  @Output() delTour = new EventEmitter();
  placesReserved: number = 0;
  displayMinusButton: boolean = false;
  displayPlusButton: boolean = true;
  displayDeleteButton: boolean = true;
  tourRating: number = 1;
  tour!: TourData;
  minPriceId = 0;
  maxPriceId = 0;


  cartData!: CartElement;

  constructor(public dbService: DbService, private cartSerivce: LocalService, private router: Router) {
  }

  ngOnInit(): void {
    this.placesReserved = this.dbService.getCartElements(this.tourData.id);
    this.setButtons();
    if(this.placesReserved > 0) this.displayMinusButton = true;
    this.cartData = {
      tourKey: this.tourData.key,
      id: this.tourData.id,
      name: this.tourData.name,
      money: this.tourData.money,
      elements: 1
    }
    this.tour = {
      tour: this.tourData,
      cart: this.cartData
    }
    this.minPriceId = this.dbService.getMostExpensiveID();
    this.maxPriceId = this.dbService.getLeastExpensiveID();

  }

  setButtons() {
    if(this.placesReserved > 0) this.displayMinusButton = true;
    if(this.placesReserved == this.tourData.places) this.displayPlusButton = false;
    if(this.placesReserved == 0 ) this.displayMinusButton = false;
    if(this.placesReserved < this.tourData.places) this.displayPlusButton = true;

  }

  incrementPlaces() {
    console.log(this.placesReserved);
    this.dbService.updateLocalCartList();
    if(this.placesReserved < this.tourData.places) {
      this.placesReserved += 1;
      //console.log(this.tourData.key);
      //this.addTourToBasket.emit(this.tourData);
      this.dbService.addToCart(this.cartData, this.placesReserved);
      this.setButtons();
    }
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      this.dbService.deleteFromCart(this.cartData, this.placesReserved);
      this.setButtons();
      }
  }

  setRate(e:number) {
    this.tourData.rate = e;
    this.dbService
      .updateRate(this.tourData.key, { rate: e })
  }

  deleteTour(e: number) {
    this.dbService.deleteTour(this.tourData.key);
  }
  showDetails(){
    this.router.navigate(['details-component', {tour: JSON.stringify(this.tourData), cart: JSON.stringify(this.cartData) }]);
  }


}

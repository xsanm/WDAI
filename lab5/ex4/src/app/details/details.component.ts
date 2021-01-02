import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartElement } from '../cart/cart.component';
import { DbService } from '../db.service';
import { LocalService } from '../local.service';
import { Tour, TourData } from '../tour/tour.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  tour!: TourData;
  placesReserved: number = 0;
  displayMinusButton: boolean = false;
  displayPlusButton: boolean = true;
  displayDeleteButton: boolean = true;
  tourRating: number = 1;
  tourData!: Tour;
  cartData!: CartElement;


  constructor(
    private route: ActivatedRoute,
    private dbService: DbService, private cartSerivce: LocalService
  ) { }

  ngOnInit(): void {
    this.dbService.updateLocalCartList();
    this.route.params.subscribe(parameter => {
      //console.log(parameter);
      this.tourData = JSON.parse(parameter['tour']) as Tour;
      this.cartData = JSON.parse(parameter['cart']) as CartElement;
    })
    //console.log(this.tourData);

    //console.log(this.tourData.id);

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
  }

  setButtons() {
    if(this.placesReserved > 0) this.displayMinusButton = true;
    if(this.placesReserved == this.tourData.places) this.displayPlusButton = false;
    if(this.placesReserved == 0 ) this.displayMinusButton = false;
    if(this.placesReserved < this.tourData.places) this.displayPlusButton = true;

  }

  incrementPlaces() {
    //console.log(this.placesReserved);
    this.dbService.updateLocalCartList();
    if(this.placesReserved < this.tourData.places) {
      this.placesReserved += 1;
      //console.log(this.tourData.key);
      //this.addTourToBasket.emit(this.tourData);
      this.dbService.addToCart(this.cartData, this.placesReserved);
      this.setButtons();
    }
    //console.log(this.cartData.elements);
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      //this.removeTourFromBasket.emit(this.tourData);
      this.dbService.deleteFromCart(this.cartData, this.placesReserved);
      //this.cartSerivce.removeTour(this.tourData);
      this.setButtons();
      }
  }

  setRate(e:number) {
    this.tourData.rate = e;
    this.dbService
      .updateRate(this.tourData.key, { rate: e })
  }




}

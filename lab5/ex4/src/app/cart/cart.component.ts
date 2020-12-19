import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Tour } from '../tour/tour.component';
import { LocalService } from '../local.service';

export interface CartElement {
  id: number,
  name: string,
  money: number,
  elements: number
}



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cart: Tour[] = [];
  @Input() cartSum: number = 0;

  constructor(private cartSerivce: LocalService) {
    this.cart = cartSerivce.getTours();
  }

  

  ngOnInit(): void {
  }

}

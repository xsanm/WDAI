import { Component, Input, OnInit } from '@angular/core';


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

  @Input() cart: CartElement[] = [];
  @Input() cartSum: number = 0;

  constructor() { }

  

  ngOnInit(): void {
  }

}

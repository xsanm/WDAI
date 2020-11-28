import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { cars } from './cars';


interface Car {
  mark: string,
  model: string,
  colors: string[]
}


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  selectedMark: string =  "";
  selectedModel: string = "";
  selectedColor: string = "";
  marks: string[] = [];
  models: string[] = [];
  colors: string[] = [];


  constructor() { 
    this.cars = cars;
    this.generateMarks();
  }

  ngOnInit(): void {
  }

  generateMarks(){
    for(let c of cars) {
      if(this.marks.includes(c.mark) == false) {
        this.marks.push(c.mark);
      }
    }
  }
  
  generateModels() {
    this.models = [];
    this.selectedModel = "";
    for(let c of cars) {
      if(c.mark == this.selectedMark) {
        this.models.push(c.model);
      }
    }
  }

  generateColors() {
    for(let c of cars) {
      if(c.mark == this.selectedMark && c.model == this.selectedModel) {
        this.colors = c.colors;
      }
    }
  }
  
}


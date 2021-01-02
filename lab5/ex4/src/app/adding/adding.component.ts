import { invalid } from "@angular/compiler/src/render3/view/util";
import { NgModule, Component, Pipe, OnInit, EventEmitter, Output } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Tour } from "../tour/tour.component";
import { CommonModule } from '@angular/common';
import { AddingService } from "../adding.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbService } from "../db.service";
//TODO
//walidaja daty konca


@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css'],
  
})
export class AddingComponent implements OnInit {

  constructor(private addingService: DbService) {
    this.createForm();
  }
  
  @Output() addTour = new EventEmitter();

  dateSent = new Date;
  dateSent2 = new Date;

  newTour: Tour = {
      key: "",
      id: 1,
      name: '',
      destination: '',
      dateBegin: '',
      dateEnd: "",
      imageURL: "assets/img/tour_pic.jpg",
      places: 0,
      money: 0,
      description: "",
      display: true,
      rate: 0
  };

  addingTripForm: FormGroup = Object();
  name: FormControl = new FormControl("",  Validators.required);
  destination: FormControl = new FormControl("",  Validators.required);
  dateBegin: FormControl = new FormControl("",  [Validators.required, dateBeginValidator]);
  dateEnd: FormControl = new FormControl("",  [Validators.required, dateEndValidator]);
  price: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  places: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  description: FormControl = new FormControl("",  Validators.required);
  imageUrl: FormControl = new FormControl("");


  createForm() {
    this.addingTripForm = new FormGroup({
      name: this.name,
      destination: this.destination,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      price: this.price,
      places: this.places,
      description: this.description,
      imageUrl: this.imageUrl,
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  dateBeginChange(e: any) {
    this.dateSent2 = e.target.value;
  }

  
  onSubmit() {
    if (this.addingTripForm.valid) {
      //TODO
      //this.newTour.imageURL = this.addingTripForm.value.imageUrl; //TODO

      console.log(typeof this.addingTripForm.value.dateBegin);

      this.addingService.createTour( {
        key: "",
        id: this.addingService.getFreeID(),
        name: this.addingTripForm.value.name,
        destination: this.addingTripForm.value.destination,
        dateBegin: this.addingTripForm.value.dateBegin,
        dateEnd: this.addingTripForm.value.dateEnd,
        imageURL: this.addingTripForm.value.imageUrl,
        places: this.addingTripForm.value.places,
        money: this.addingTripForm.value.price,
        description: this.addingTripForm.value.description,
        display: true,
        rate: 1
    });
      this.addingTripForm.reset();
    }
  }
}

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}

export function dateBeginValidator(control: FormControl) { 

  let date = (new Date).toISOString().substring(0, 10);

  if(control.value < date) return { invalidDateBegin: true };

  return null; 
}

export function dateEndValidator(d: FormGroup): ValidatorFn { 

  return (control: AbstractControl): ValidationErrors | null => {
    
    console.log(d.value.da, control.value);
    if(control.value < d) return { 'invalidDateEnd': true };
    return null; 
    
  }

  
}
import { NgModule, Component, Pipe, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";



@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css'],
  
})
export class AddingComponent implements OnInit {

  constructor() {this.createForm();}
  
  addingTripForm: FormGroup;
  name: FormControl = new FormControl();
  destination: FormControl = new FormControl();
  dateBegin: FormControl = new FormControl();
  dateEnd: FormControl = new FormControl();
  price: FormControl = new FormControl();
  places: FormControl = new FormControl();
  description: FormControl = new FormControl();



  createForm() {
    this.addingTripForm = new FormGroup({
      name: this.name,
      destination: this.destination,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      price: this.price,
      places: this.places,
      description: this.description
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  onSubmit() {
    if (this.addingTripForm.valid) {
      console.log("Form Submitted!");
      console.log(this.addingTripForm.value);
      this.addingTripForm.reset();
    }
    console.log("gsfg");
  }
}

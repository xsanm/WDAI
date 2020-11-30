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

  constructor() { }
  
  addingTripForm: FormGroup ;
  name: FormControl;
  destination: FormControl;
  dateBegin: FormControl;
  dateEnd: FormControl;
  price: FormControl;
  places: FormControl;
  description: FormControl;

  createFormControls() {
    this.name = new FormControl(),
    this.destination = new FormControl(),
    this.dateBegin = new FormControl(),
    this.dateEnd = new FormControl(),
    this.price = new FormControl(),
    this.places = new FormControl(),
    this.description = new FormControl()
  }

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
    this.createFormControls();
    this.createForm();
  }
  onSubmit() {
    /*if (0 && this.addingTripForm.valid) {
      console.log("Form Submitted!");
      console.log(this.addingTripForm.value);
      this.addingTripForm.reset();
    }*/
    console.log("gsfg");
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student } from '../student';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Student = new Student();
  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Student();
  }

  save() {
    this.customerService.createCustomer(this.customer);
    this.customer = new Student();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}

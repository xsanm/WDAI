import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Student } from '../student';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer: Student;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.customerService
      .updateCustomer(this.customer.key, { active: isActive })

  }

  deleteCustomer() {
    this.customerService
      .deleteCustomer(this.customer.key)
  }

}

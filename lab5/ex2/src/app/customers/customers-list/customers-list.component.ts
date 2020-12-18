import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { map } from 'rxjs/operators';
import { Student } from '../student';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersList();
  }

  getCustomersList() {
    this.customerService.getCustomersList();
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(customers =>{
      this.customers = customers;
    });
  }

  deleteCustomers() {
    this.customerService.deleteAll();
  }

}

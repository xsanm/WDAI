import { Injectable } from '@angular/core';

import { Student } from '../customers/student';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dbPath = 'student';
  customersRef: AngularFireList<Student>;
  daneRef: Observable<any[]>;
  baza : AngularFireDatabase;
  
  constructor(private db: AngularFireDatabase) { 
    this.baza = db;
    this.customersRef = db.list(this.dbPath)
    
  }

  createCustomer(customer: Student): void {
    this.customersRef.push({...customer})
    //console.log(customer);
    //console.log(this.customersRef.valueChanges());
  }

  updateCustomer(key: string, value: any) {
    this.customersRef.update(key, value);
    //console.log(key);
  } 

  deleteCustomer(key: string) {
    this.customersRef.remove(key);
  }

  getCustomersList()  {
    
    this.daneRef = this.baza.list('students').snapshotChanges();
    //console.log(this.baza.list);
    return this.customersRef;
  }

   deleteAll() {
     this.customersRef.remove();
   }
    
}

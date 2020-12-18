import { Injectable } from '@angular/core';

import { Student } from '../customers/student';
import { AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dbPath = 'student';
  customersRef: AngularFirestoreCollection<Student>;
  //daneRef: Observable<any[]>;
  //baza : AngularFireDatabase;
  
  constructor(private db: AngularFirestore) { 
    //this.baza = db;
    this.customersRef = db.collection(this.dbPath)
    
  }

  createCustomer(customer: Student): void {
    this.customersRef.add({...customer});
    //this.customersRef.push({...customer})
    //console.log(customer);
    //console.log(this.customersRef.valueChanges());
  }

  updateCustomer(key: string, value: any) {
    this.customersRef.doc(key).update(value);
    //this.customersRef.update(key, value);
    //console.log(key);
  } 

  deleteCustomer(key: string) {
    this.customersRef.doc(key).delete();
  }

  getCustomersList()  {
    
    //this.daneRef = this.baza.list('students').snapshotChanges();
    //console.log(this.baza.list);
    return this.customersRef;
  }

   deleteAll() {
     this.customersRef.get().subscribe (
       snaphot => {
        snaphot.forEach((doc) => {
           doc.ref.delete();
         });
       }
     );

   }
    
}

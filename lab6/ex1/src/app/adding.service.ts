import { Injectable } from '@angular/core';
import { Tour } from './tour/tour.component';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddingService {

  private dbPath = 'tours';
  toursRef: AngularFireList<Tour>;


  constructor(private db: AngularFireDatabase) {
    this.toursRef = db.list(this.dbPath)
  }

  createTour(tour: Tour): void {
    this.toursRef.push({...tour})
  }

}

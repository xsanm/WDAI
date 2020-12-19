import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Tour } from './tour/tour.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private dbPath = 'tours';
  toursRef: AngularFireList<Tour>;


  constructor(private db: AngularFireDatabase) {
    this.toursRef = db.list(this.dbPath)
  }

  createTour(tour: Tour): void {
    this.toursRef.push({...tour})
  }

  getToursList()  {
    return this.toursRef;
  }

  deleteTour(key: string) {
    this.toursRef.remove(key);
  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourComponent } from './tour/tour.component';
import { BookedToursComponent } from './booked-tours/booked-tours.component';
import { RatingComponent } from './rating/rating.component';
import { AddingComponent } from './adding/adding.component';

@NgModule({
  declarations: [
    AppComponent,
    TourComponent,
    BookedToursComponent,
    RatingComponent,
    AddingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
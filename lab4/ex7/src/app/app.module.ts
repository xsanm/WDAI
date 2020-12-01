import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourComponent } from './tour/tour.component';
import { BookedToursComponent } from './booked-tours/booked-tours.component';
import { RatingComponent } from './rating/rating.component';
import { AddingComponent } from './adding/adding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { FliterComponent } from './fliter/fliter.component';
import { TourFilterPipe } from './tour-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    TourComponent,
    BookedToursComponent,
    RatingComponent,
    AddingComponent,
    CartComponent,
    FliterComponent,
    TourFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

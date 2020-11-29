import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ex6';

  clicks: number = 0;
  btnIsDisable: boolean = false;

  setClicksNumber(e: number) {
    this.clicks = e;
    if (this.clicks >= 10) {
      this.btnIsDisable = true;
    }
  }
  
  resetClicksNumber() {
    this.clicks = 0;
    this.btnIsDisable = false;
  }



}

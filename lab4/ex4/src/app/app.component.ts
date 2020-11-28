import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ex4';

  res = new Array();

  tabliczka(tab1: string[], tab2: number[]) {
      for(let e of tab1){
        for (let i in tab2){
          this.res.push(e + i);
        }
      }
      console.log(this.res);
  }

  constructor() {
    this.tabliczka(["Ala", "ma", "kota"], [0, 1, 2, 3]);
  }

}

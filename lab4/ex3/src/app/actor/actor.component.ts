import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})

export class ActorComponent implements OnInit {
  nr = 1;
  imie = "";
  nazwisko = "";
  film = "";

  constructor() { }

  ngOnInit(): void {
  }

  showInformations() {
    console.log("chce info");
    this.imie = (document.getElementById('fname') as HTMLInputElement).value;
    this.nazwisko = (document.getElementById('sname') as HTMLInputElement).value;
    this.film =  (document.getElementById('ftitle') as HTMLInputElement).value;
  }

}

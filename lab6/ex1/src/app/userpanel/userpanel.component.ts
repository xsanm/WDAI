import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  modelForm = new FormControl();
  persValue = "LOCAL"

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  setPersistence(s: string){
    //console.log(this.persValue);
    this.auth.setPersistance(s.toLowerCase());
    console.log("Setting persistence to: " + s);
  }


}

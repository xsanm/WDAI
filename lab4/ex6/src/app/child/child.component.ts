import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  count:number = 0;
  @Output() countEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  @Input() isDisable: boolean = false;

  constructor() { 
    this.isDisable = false;
  }

  ngOnInit(): void {
  }

  increment() {
    this.count++;
    this.countEvent.emit(this.count);
  }

  reset() {
    this.count = 0;
    this.resetEvent.emit();
  }

}

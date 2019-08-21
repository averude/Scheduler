import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DayType } from '../../../../../../../model/daytype';

@Component({
  selector: '[app-add-daytype]',
  templateUrl: './add-daytype.component.html',
  styleUrls: ['./add-daytype.component.css']
})
export class AddDaytypeComponent implements OnInit {

  newDayType: DayType = new DayType();
  @Output()
  dayTypeCreated: EventEmitter<DayType> = new EventEmitter<DayType>();

  constructor() { }

  ngOnInit() {
  }

  addDayType() {
    this.dayTypeCreated.emit(this.newDayType);
    this.clearModel();
  }

  clearModel() {
    this.newDayType = new DayType();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { calculateHoursByHasTimeString } from "../../../../../../../../shared/utils/utils";
import { HasDayTypeAndTime } from "../../../../../../../../model/interface/has-day-type-and-time";

@Component({
  selector: 'app-context-menu-daytype-item',
  templateUrl: './context-menu-daytype-item.component.html',
  styleUrls: ['./context-menu-daytype-item.component.css']
})
export class ContextMenuDaytypeItemComponent implements OnInit {

  @Input() hasDayTypeAndTime: HasDayTypeAndTime;

  constructor() { }

  ngOnInit() {
  }

  showTimeValues(): boolean {
    return !!(this.hasDayTypeAndTime.startTime && this.hasDayTypeAndTime.endTime);
  }

  getLabel() {
    if (this.hasDayTypeAndTime && this.hasDayTypeAndTime.dayType
      && this.hasDayTypeAndTime.dayType.label
      && this.hasDayTypeAndTime.dayType.label.length > 0) {
      return this.hasDayTypeAndTime.dayType.label;
    } else {
      return calculateHoursByHasTimeString(this.hasDayTypeAndTime);
    }
  }
}


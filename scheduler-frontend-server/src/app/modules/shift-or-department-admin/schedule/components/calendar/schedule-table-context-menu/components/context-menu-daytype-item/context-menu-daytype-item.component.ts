import { Component, Input, OnInit } from '@angular/core';
import { DepartmentDayType } from "../../../../../../../../model/department-day-type";
import { calculateHoursByHasTimeString } from "../../../../../../../../shared/utils/utils";

@Component({
  selector: 'app-context-menu-daytype-item',
  templateUrl: './context-menu-daytype-item.component.html',
  styleUrls: ['./context-menu-daytype-item.component.css']
})
export class ContextMenuDaytypeItemComponent implements OnInit {

  @Input() departmentDayType: DepartmentDayType;

  constructor() { }

  ngOnInit() {
  }

  showTimeValues(): boolean {
    return !!(this.departmentDayType.startTime && this.departmentDayType.endTime);
  }

  getLabel() {
    if (this.departmentDayType.dayType && this.departmentDayType.dayType.label && this.departmentDayType.dayType.label.length > 0) {
      return this.departmentDayType.dayType.label
    } else {
      return calculateHoursByHasTimeString(this.departmentDayType);
    }
  }
}


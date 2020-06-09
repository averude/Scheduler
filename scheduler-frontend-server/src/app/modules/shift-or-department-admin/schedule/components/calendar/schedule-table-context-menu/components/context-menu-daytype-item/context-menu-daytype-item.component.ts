import { Component, Input, OnInit } from '@angular/core';
import { DepartmentDayType } from "../../../../../../../../model/department-day-type";

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
}

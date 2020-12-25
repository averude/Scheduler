import { Component, Input, OnInit } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/pattern-unit';
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { ListItem } from "../common/list-item";

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent extends ListItem<PatternUnit> implements OnInit {

  @Input() departmentDayTypes: DepartmentDayType[];

  selectedDepartmentDayType: DepartmentDayType;

  color: string = 'transparent';

  ngOnInit() {
    const dayType = this.item.dayType;
    if (dayType) {
      this.color = dayType.dayTypeGroup.color;
      const depDayType = this.departmentDayTypes
        .find(depDayType => depDayType.dayType.id === dayType.id);
      if (depDayType) {
        this.selectedDepartmentDayType = depDayType;
      }
    }
  }

  onChange(event) {
    const depDayType = event.value;
    if (depDayType) {
      this.fillInTheUnit(depDayType);
    }
  }

  private fillInTheUnit(type: DepartmentDayType) {
    this.item.dayType         = type.dayType;
    this.item.startTime       = type.startTime;
    this.item.endTime         = type.endTime;
    this.item.breakStartTime  = type.breakStartTime;
    this.item.breakEndTime    = type.breakEndTime;
    this.color                = type.dayType.dayTypeGroup.color;
  }
}

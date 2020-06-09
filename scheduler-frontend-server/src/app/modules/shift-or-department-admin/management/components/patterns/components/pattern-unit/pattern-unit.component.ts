import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/pattern-unit';
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { IdEntity } from "../../../../../../../model/interface/id-entity";

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent implements OnInit {

  @Input() unit: PatternUnit;
  @Input() departmentDayTypes: DepartmentDayType[];

  selectedDepartmentDayType: DepartmentDayType;

  @Output() onDelete:   EventEmitter<PatternUnit> = new EventEmitter();

  color: string = 'transparent';

  usePreviousValue: boolean = false;

  constructor() { }

  ngOnInit() {
    let depDayType = this.departmentDayTypes
      .find(depDayType => depDayType.dayType.id === this.unit.dayTypeId);
    if (depDayType) {
      this.selectedDepartmentDayType = depDayType;
      this.color = depDayType.dayType.dayTypeGroup.color;
    }
  }

  delete() {
    this.onDelete.emit(this.unit);
  }

  onChange(event) {
    const depDayType = event.value;
    if (depDayType) {
      this.fillInTheUnit(depDayType);
    }
  }

  private fillInTheUnit(type: DepartmentDayType) {
    this.unit.dayTypeId       = type.dayType.id;
    this.unit.startTime       = type.startTime;
    this.unit.endTime         = type.endTime;
    this.unit.breakStartTime  = type.breakStartTime;
    this.unit.breakEndTime    = type.breakEndTime;
    this.usePreviousValue     = type.dayType.usePreviousValue;
    this.color                = type.dayType.dayTypeGroup.color;
  }

  compareIdEntity(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }
}

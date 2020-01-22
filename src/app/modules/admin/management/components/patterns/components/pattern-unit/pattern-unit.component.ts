import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/pattern-unit';
import { DayType } from '../../../../../../../model/day-type';
import { DayTypeGroup } from "../../../../../../../model/day-type-group";

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent implements OnInit {

  @Input() unit: PatternUnit;
  @Input() dayTypes: DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];

  @Output() onDelete:   EventEmitter<PatternUnit> = new EventEmitter();

  color: string = 'transparent';

  usePreviousValue: boolean = false;

  constructor() { }

  ngOnInit() {
    let dayType = this.dayTypes.find(dayType => dayType.id === this.unit.dayTypeId);
    if (dayType) {
      this.setColorOfUnit(dayType.dayTypeGroupId);
    }
  }

  delete() {
    this.onDelete.emit(this.unit);
  }

  onChange(event) {
    const dayTypeId = event.value;
    let type = this.dayTypes.find(dayType => dayType.id === dayTypeId);
    if (type) {
      this.fillInTheUnit(type);
    }
  }

  private fillInTheUnit(type: DayType) {
    this.unit.startTime     = type.startTime;
    this.unit.endTime       = type.endTime;
    this.unit.breakStartTime    = type.breakStartTime;
    this.unit.breakEndTime      = type.breakEndTime;
    this.usePreviousValue   = type.usePreviousValue;
    this.setColorOfUnit(type.dayTypeGroupId);
  }

  private setColorOfUnit(dayTypeGroupId: number) {
    let dayTypeGroup = this.dayTypeGroups.find(group => group.id === dayTypeGroupId);
    if (dayTypeGroup) {
      this.color = dayTypeGroup.color;
    }
  }
}

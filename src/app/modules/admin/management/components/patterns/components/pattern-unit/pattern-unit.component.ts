import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { DayType } from '../../../../../../../model/daytype';

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent implements OnInit {

  @Input() unit: PatternUnit;
  @Input() dayTypes: DayType[];

  @Output() onDelete:   EventEmitter<PatternUnit> = new EventEmitter();
  @Output() onMoveUp:   EventEmitter<PatternUnit> = new EventEmitter();
  @Output() onMoveDown: EventEmitter<PatternUnit> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  moveUp() {
    this.onMoveUp.emit(this.unit);
  }

  moveDown() {
    this.onMoveDown.emit(this.unit);
  }

  delete() {
    this.onDelete.emit(this.unit);
  }

  onChange(event) {
    const dayTypeId = event.value;
    this.unit.label = this.dayTypes
      .find(dayType => dayType.id === dayTypeId)
      .label;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayType } from "../../../../model/day-type";
import { SummationColumnDayTypeRange } from "../../../../model/summation-column-day-type-range";
import { IdEntity } from "../../../../model/interface/id-entity";

@Component({
  selector: 'app-summation-range-unit',
  templateUrl: './summation-range-unit.component.html',
  styleUrls: ['./summation-range-unit.component.css']
})
export class SummationRangeUnitComponent implements OnInit {

  @Input() child: SummationColumnDayTypeRange;
  @Input() dayTypes: DayType[];

  selectedDayType: DayType;

  @Output() onDelete:   EventEmitter<SummationColumnDayTypeRange> = new EventEmitter();

  usePreviousValue: boolean = false;

  constructor() { }

  ngOnInit() {
    let dayType = this.dayTypes
      .find(dayType => dayType.id === this.child.dayTypeId);
    if (dayType) {
      this.selectedDayType = dayType;
    }
  }

  delete() {
    this.onDelete.emit(this.child);
  }

  compareIdEntity(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }

  compareNumber(a: number, b: number): boolean {
    return a == b;
  }
}

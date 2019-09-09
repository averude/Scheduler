import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Shift } from "../../../../../model/shift";
import { Position } from "../../../../../model/position";
import { Employee } from "../../../../../model/employee";
import { Observable } from "rxjs";
import { ShiftPattern } from "../../../../../model/shift-pattern";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { ScheduleDto } from "../../../../../model/dto/schedule-dto";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css']
})
export class TableShiftGroupComponent implements OnInit, OnChanges {
  numberOfColumns: number;

  @Input() mouseMove$:    Observable<number>;
  @Input() mouseUp$:      Observable<MouseEvent>;

  @Input() patterns:      ShiftPattern[];
  @Input() shift:         Shift;
  @Input() positions:     Position[];
  @Input() employees:     Employee[];
  @Input() schedule:      ScheduleDto[];
  @Input() dayTypes:      DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];

  @Input() workingTimeNorm: number;

  isHidden: boolean = false;

  constructor(private cd: ChangeDetectorRef,
              private paginatorService: PaginatorService) {

  }

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => this.numberOfColumns = daysInMonth.length + 4);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getPosition(employee: Employee): Position {
    return this.positions.find(position => position.id === employee.positionId);
  }

  getSchedule(employeeId: number): ScheduleDto {
    return this.schedule.find(schedule => schedule.employeeId === employeeId);
  }
}

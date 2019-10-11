import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { Employee } from "../../../../../../../model/employee";
import { Observable } from "rxjs";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ScheduleDto } from "../../../../../../../model/dto/schedule-dto";
import { TableRowComponent } from "../table-row/table-row.component";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css']
})
export class TableShiftGroupComponent implements OnInit {
  numberOfColumns: number;

  @Input() mouseMove$:    Observable<number>;
  @Input() mouseUp$:      Observable<MouseEvent>;

  @Input() shift:         Shift;
  @Input() positions:     Position[];
  @Input() employees:     Employee[];
  @Input() schedule:      ScheduleDto[];
  @Input() dayTypes:      DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() patternMenu:   ContextMenuComponent;

  @Input() workingTimeNorm: number;

  isHidden: boolean = false;

  @ViewChildren(TableRowComponent)
  rows: QueryList<TableRowComponent>;

  constructor(private paginatorService: PaginatorService) {}

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => this.numberOfColumns = daysInMonth.length + 3);
  }

  getPosition(employee: Employee): Position {
    return this.positions.find(position => position.id === employee.positionId);
  }

  getSchedule(employeeId: number): ScheduleDto {
    return this.schedule.find(schedule => schedule.employeeId === employeeId);
  }
}

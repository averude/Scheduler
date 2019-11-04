import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { Employee } from "../../../../../../../model/employee";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ScheduleDto } from "../../../../../../../model/dto/schedule-dto";
import { TableRowComponent } from "../table-row/table-row.component";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { isBetween } from "../../utils/schedule-table-utils";
import { WorkDay } from "../../../../../../../model/workday";
import { ScheduleTableStatUtils } from "../../utils/schedule-table-stat-utils";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableShiftGroupComponent implements OnInit {
  numberOfColumns: number;

  @Input() shift:         Shift;
  @Input() shiftSchedule: ShiftSchedule[];
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

  constructor(private paginatorService: PaginatorService,
              private utils: ScheduleTableStatUtils) {}

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => this.numberOfColumns = daysInMonth.length + 3);
  }

  getPosition(employee: Employee): Position {
    return this.positions.find(position => position.id === employee.positionId);
  }

  // The algorithm needs to be reviewed
  getSomeShitInTheHouse(employeeId: number, shiftId: number): WorkDay[] {
    // console.log('SHIT');
    let ss = this.shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);
    if (ss && !ss.substitution) {
      return this.filterSchedule(employeeId, shiftId);
    } else {
      return this.filter(employeeId, shiftId);
    }
  }

  private filter(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
    let dto = this.schedule
      .find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays
        .filter(workDay => {
          for (let i = 0; i < shiftSchedules.length; i++) {
            let ss = shiftSchedules[i];
            if (isBetween(workDay.date, ss.from, ss.to)) {
              return true;
            }
          }
        });
    }
  }

  private filterSchedule(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
    let sdto = this.schedule.find(schedule => schedule.employeeId === employeeId);
    if (sdto) {
      return this.recursivelyDo(sdto.workDays, shiftSchedules, shiftSchedules.length);
    }
  }

  private recursivelyDo(array: WorkDay[], limits: ShiftSchedule[], i: number): any  {
    if (i == 0) {
      return array;
    } else {
      i--;
      let limit = limits[i];
      return this.recursivelyDo(array.filter(value => !isBetween(value.date, limit.from, limit.to)), limits, i);
    }
  }
}

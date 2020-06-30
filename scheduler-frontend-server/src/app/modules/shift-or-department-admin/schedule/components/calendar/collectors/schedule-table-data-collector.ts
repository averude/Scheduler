import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { Shift } from "../../../../../../model/shift";
import { WorkingTime } from "../../../../../../model/working-time";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { getEmployeeShortName } from "../../../../../../shared/utils/utils";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { isBetween } from "../../../../../../lib/ngx-schedule-table/utils/table-utils";
import { Injectable } from "@angular/core";
import { ShiftCompositionDivider } from "../../../../../../services/divider/shift-composition-divider";

@Injectable()
export class ScheduleTableDataCollector {

  constructor(private compositionDivider: ShiftCompositionDivider) {}

  getTableData(dates: CalendarDay[],
               shifts: Shift[],
               compositions: ShiftComposition[],
               schedule: BasicDto<Employee, WorkDay>[],
               workingTimeNorms: WorkingTime[]): RowGroupData[] {
    let rowGroups = [];
    for (let shiftIndex = 0, shiftWorkingTimeNormIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
      let shift       = shifts[shiftIndex];
      let workingTime = workingTimeNorms[shiftWorkingTimeNormIndex];
      let hoursNorm   = 0;

      let groupData = {
        groupId:    shift.id,
        groupName:  shift.name,
      } as RowGroupData;

      if (workingTime && shift.id === workingTime.shiftId) {
        shiftWorkingTimeNormIndex++;
        hoursNorm = workingTime.hours;
      }

      groupData.rowData = this.getRowData(dates, shift.id, compositions, schedule, hoursNorm, workingTimeNorms);
      rowGroups.push(groupData)
    }

    return rowGroups;
  }

  private getShiftWorkingTime(shiftId: number,
                              workingTime: WorkingTime[]): number {
    let time = workingTime.find(value => value.shiftId === shiftId);
    return time ? time.hours : 0;
  }

  private getRowData(dates: CalendarDay[],
                     shiftId: number,
                     compositions: ShiftComposition[],
                     schedule: BasicDto<Employee, WorkDay>[],
                     workingTimeNorm: number,
                     shiftsWorkingTime: WorkingTime[]): SchedulerRowData[] {
    return this.getEmployeeScheduleForShift(shiftId, compositions, schedule)
      .map(employeeSchedule => {
        let employeeCompositions  = this.getEmployeeShiftCompositions(employeeSchedule.parent.id, compositions);

        let isSubstitution = !employeeCompositions.find(value => !value.substitution && value.shiftId === shiftId);

        let row = new SchedulerRowData();
        row.id = employeeSchedule.parent.id;
        row.name = getEmployeeShortName(employeeSchedule.parent);
        row.position = employeeSchedule.parent.position.shortName;
        row.isSubstitution = isSubstitution;
        row.cellData = this.getCellData(row.id, shiftId, isSubstitution, employeeCompositions, employeeSchedule.collection, dates);
        if (isSubstitution) {
          row.timeNorm = this.getEmployeeMainShiftWorkingTime(employeeSchedule.parent.id, employeeCompositions, shiftsWorkingTime);
        } else {
          row.timeNorm = workingTimeNorm;
        }
        return row;
      });
  }

  private getEmployeeScheduleForShift(shiftId: number,
                                      compositions: ShiftComposition[],
                                      schedule: BasicDto<Employee, WorkDay>[]): BasicDto<Employee, WorkDay>[] {
    let employeeIds = compositions
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return schedule
      .filter(value => employeeIds.findIndex(id => value.parent.id === id) >= 0);
  }

  private getEmployeeShiftCompositions(employeeId: number,
                                       compositions: ShiftComposition[]): ShiftComposition[] {
    return compositions.filter(value => value.employeeId === employeeId);
  }

  private getEmployeeMainShiftWorkingTime(employeeId: number,
                                          shiftCompositions: ShiftComposition[],
                                          shiftsWorkingTime: WorkingTime[]): number {
    let shiftComposition = shiftCompositions.find(value => !value.substitution && value.employeeId === employeeId);
    return shiftComposition ? this.getShiftWorkingTime(shiftComposition.shiftId, shiftsWorkingTime) : 0;
  }

  private getCellData(employeeId: number,
                      shiftId: number,
                      isSubstitution: boolean,
                      shiftComposition: ShiftComposition[],
                      schedule: WorkDay[],
                      calendarDays: CalendarDay[]): CellData[] {
    let compositions = this.getCompositions(isSubstitution, employeeId, shiftId, shiftComposition);
    return this.getCellDataForShift(calendarDays, compositions, schedule);
  }

  private getCompositions(isSubstitution: boolean,
                          employeeId: number,
                          shiftId: number,
                          shiftComposition: ShiftComposition[]) {
    if (isSubstitution) {
      return this.getSubstitutionShiftComposition(employeeId, shiftId, shiftComposition);
    } else {
      let tuple = this.getMainAndSubstitutionCompositions(employeeId, shiftId, shiftComposition);
      return this.compositionDivider.divide(tuple[0], tuple[1]);
    }
  }

  private getMainAndSubstitutionCompositions(
    employeeId: number,
    shiftId: number,
    shiftCompositions: ShiftComposition[]
  ): [ShiftComposition, ShiftComposition[]] {
    let mainComposition;
    let substitutions = [];
    for (let composition of shiftCompositions) {
      if (!composition.substitution
        && composition.employeeId === employeeId
        && composition.shiftId === shiftId) {
        mainComposition = composition;
      }

      if (composition.substitution
        && composition.employeeId === employeeId
        && composition.shiftId !== shiftId) {
        substitutions.push(composition);
      }
    }

    return [mainComposition, substitutions];
  }

  private getCellDataForShift(calendarDays: CalendarDay[],
                              shiftComposition: ShiftComposition[],
                              schedule: WorkDay[]): CellData[] {
    let cells: CellData[];
    if (schedule) {
      let workDayIndex = 0;
      cells = calendarDays.map(day => {

        let cell: CellData = {
          date: day,
          value: null,
          enabled: false,
        };

        let workDay = schedule[workDayIndex];

        if (workDay && day.isoString === workDay.date) {
          workDayIndex++;
          this.setCell(shiftComposition, cell, workDay);
        } else {
          this.setCell(shiftComposition, cell, null);
        }
        return cell;
      });
      return cells;
    }
  }

  private getSubstitutionShiftComposition(employeeId: number,
                                          shiftId: number,
                                          shiftComposition: ShiftComposition[]): ShiftComposition[] {
    return shiftComposition
      .filter(value =>
        value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
  }

  private setCell(shiftComposition: ShiftComposition[],
                  cell: CellData,
                  workDay: WorkDay) {
    shiftComposition.forEach(value => {
      if (isBetween(cell.date.isoString, value.from, value.to)) {
        cell.enabled = true;
        cell.value = workDay;
      }
    });
  }
}

import { Injectable } from "@angular/core";
import { Shift } from "../../../../../../model/shift";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../../../../model/main-shift-composition";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";
import { WorkingNorm } from "../../../../../../model/working-norm";
import { Cell, Row, RowGroup, TableData } from "../model/table-data";
import * as moment from "moment";
import { CellEnabledSetter } from "./cell-enabled-setter";

@Injectable()
export class TableTreeDataCollector {

  constructor(private cellEnabledSetter: CellEnabledSetter) {
  }

  createTree(shifts: Shift[],
             mainShiftCompositions: MainShiftComposition[],
             substitutionShiftCompositions: SubstitutionShiftComposition[],
             calendarDays: CalendarDay[],
             schedule: BasicDto<Employee, WorkDay>[],
             workingNorms?: WorkingNorm[]) {
    const table: TableData = new TableData();

    const sortedShifts = shifts.sort((a, b) => a.id - b.id);
    const sortedMainCompositions = mainShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.employee.id - b.employee.id));
    const sortedSubstitutionCompositions = substitutionShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.employee.id - b.employee.id));

    table.from = moment.utc(calendarDays[0].isoString);
    table.to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    table.groups = sortedShifts.map(shift => {
      const shiftSchedule = this.getShiftSchedule(shift, schedule, sortedMainCompositions, sortedSubstitutionCompositions);

      const shiftMainCompositions = sortedMainCompositions.filter(composition => composition.shiftId === shift.id);
      const shiftSubstitutionCompositions = sortedSubstitutionCompositions.filter(composition => composition.shiftId === shift.id);

      return this.createRowGroup(table, shift, shiftMainCompositions, shiftSubstitutionCompositions, calendarDays, shiftSchedule, workingNorms);
    });

    this.cellEnabledSetter.setTableEnabledCells(table, sortedSubstitutionCompositions);

    return table;
  }


  private getShiftSchedule(shift: Shift,
                           schedule: BasicDto<Employee, WorkDay>[],
                           mainShiftCompositions: MainShiftComposition[],
                           substitutionShiftCompositions: SubstitutionShiftComposition[]): BasicDto<Employee, WorkDay>[] {
    return schedule
      .filter(dto => {
        return mainShiftCompositions.some(mainComposition => mainComposition.shiftId === shift.id
          && mainComposition.employee.id === dto.parent.id)
          || substitutionShiftCompositions.some(substitutionComposition =>
            substitutionComposition.shiftId === shift.id && substitutionComposition.employee.id === dto.parent.id)
      });
  }

  private createRowGroup(table: TableData,
                         shift: Shift,
                         mainShiftCompositions: MainShiftComposition[],
                         substitutionShiftCompositions: SubstitutionShiftComposition[],
                         calendarDays: CalendarDay[],
                         schedule: BasicDto<Employee, WorkDay>[],
                         workingNorms?: WorkingNorm[]): RowGroup {
    const group = new RowGroup();
    group.table = table;
    group.id = shift.id;
    group.name = shift.name;

    const mainShiftCompositionsRowData = mainShiftCompositions
      .map(composition => {
        const hours = workingNorms?.find(value => value.shiftId === composition.shiftId)?.hours || 0;
        const employeeSchedule = schedule.find(value => value.parent.id === composition.employee.id);
        return this.createRow(group, composition, calendarDays, employeeSchedule, hours);
      });

    const substitutionShiftCompositionsRowData = substitutionShiftCompositions
      .map(composition => {
        const hours = workingNorms?.find(value => value.shiftId === composition.mainShiftComposition.shiftId)?.hours || 0;
        const employeeSchedule = schedule.find(value => value.parent.id === composition.employee.id);
        return this.createRow(group, composition, calendarDays, employeeSchedule, hours);
      });

    group.rows = mainShiftCompositionsRowData
      .concat(substitutionShiftCompositionsRowData)
      .sort(((a, b) => a.id - b.id));
    return group;
  }

  createRow(group: RowGroup,
            composition: MainShiftComposition | SubstitutionShiftComposition,
            calendarDays: CalendarDay[],
            schedule: BasicDto<Employee, WorkDay>,
            norm?: number) {
    if (!schedule) {
      return;
    }

    let scheduleIndex = 0;
    let workDays = schedule.collection;

    const row = {} as Row;
    row.group = group;
    row.id = schedule.parent.id;
    row.employee = schedule.parent;
    row.composition = composition;
    // row.isSubstitution = !!((composition as SubstitutionShiftComposition).mainShiftComposition);
    row.workingNorm = norm;
    row.cellData = calendarDays.map(day => {
      let result;

      const workDay = workDays[scheduleIndex];
      if (workDay && day.isoString === workDay.date) {
        scheduleIndex++;
        result = this.createCell(row, day, workDay);
      } else {
        result = this.createCell(row, day, null);
      }

      return result;
    });
    return row;
  }

  private createCell(row: Row,
                     day: CalendarDay,
                     workDay: WorkDay): Cell {
    const cell = {} as Cell;
    cell.row = row;
    cell.value = workDay;
    cell.date = day;
    cell.enabled = false;
    return cell;
  }
}

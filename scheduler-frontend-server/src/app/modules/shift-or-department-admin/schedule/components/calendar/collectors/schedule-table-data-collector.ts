import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { Shift } from "../../../../../../model/shift";
import { WorkingNorm } from "../../../../../../model/working-norm";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { getEmployeeShortName } from "../../../../../../shared/utils/utils";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { Injectable } from "@angular/core";
import { ShiftCompositionDivider } from "../../../../../../services/divider/shift-composition-divider";
import * as moment from "moment";

@Injectable()
export class ScheduleTableDataCollector {

  constructor(private divider: ShiftCompositionDivider) {}

  getTableData(dates: CalendarDay[],
               shifts: Shift[],
               compositions: ShiftComposition[],
               schedule: BasicDto<Employee, WorkDay>[],
               workingNorms: WorkingNorm[]): RowGroupData[] {
    let groupData: RowGroupData[] = [];

    let compositionsMap = this.divider.divideMainCompositionsByEmployee(compositions);

    for (let shift of shifts) {
      groupData[shift.id] = {
        groupId:    shift.id,
        groupName:  shift.name,
        rowData:    []
      };
    }

    for (let employeeSchedule of schedule) {

      let employee            = employeeSchedule.parent;
      let employeeWorkDays    = employeeSchedule.collection;
      let employeeCompositions = compositionsMap.get(employee.id);
      let employeeWorkNorm    = this.getWorkingNorm(employeeCompositions, workingNorms);

      if (!employeeCompositions) {
        continue;
      }

      for (let dayIndex = 0, scheduleIndex = 0; dayIndex < dates.length; dayIndex++) {

        let date    = dates[dayIndex];
        let workDay = employeeWorkDays[scheduleIndex];

        if (workDay && workDay.date === date.isoString) {
          scheduleIndex++;
        } else workDay = null;

        compositionsLoop:
          for (let index = 0; index < employeeCompositions.length; index++) {
            let compositions = employeeCompositions[index];
            for (let subIndex = 0; subIndex < compositions.length; subIndex++) {
              /*In case of further complexity it could be migrated to tree data structure*/
              let subComposition = compositions[subIndex];
              if (this.isInComposition(date.isoString, subComposition)) {
                this.insertDataInGroup(groupData[subComposition.shiftId], subComposition,
                  date, employee, workDay, employeeWorkNorm, true, dayIndex);
                this.fillOtherGroups(subComposition.shiftId, date, employee, workDay,
                  employeeWorkNorm, groupData, employeeCompositions, index, dayIndex);
                break compositionsLoop;
              } else {
                this.insertDataInGroup(groupData[subComposition.shiftId], subComposition,
                  date, employee, workDay, employeeWorkNorm, false, dayIndex);
              }
            }
          }
      }
    }

    groupData.forEach(value => value.rowData = value.rowData.filter(v => v));
    groupData = groupData.filter(value => value);

    return groupData;
  }

  private insertDataInGroup(rowGroup: RowGroupData,
                            composition: ShiftComposition,
                            date: CalendarDay,
                            employee: Employee,
                            workDay: WorkDay,
                            workingNorm: number,
                            isEnabled: boolean,
                            dayIndex: number) {
    let employeeId  = composition.employeeId;
    let rowData     = rowGroup.rowData[employeeId];

    if (!rowData) {
      rowGroup.rowData[employeeId] = {
        id:             employeeId,
        name:           getEmployeeShortName(employee),
        position:       employee.position.shortName,
        isSubstitution: composition.substitution,
        workingNorm:    workingNorm,
        cellData:       []
      } as SchedulerRowData;
    }

    rowGroup.rowData[employeeId].cellData[dayIndex] = {
      date: date,
      value: workDay,
      enabled: isEnabled,
    };
  }

  private fillOtherGroups(shiftId: number,
                          date: CalendarDay,
                          employee: Employee,
                          workDay: WorkDay,
                          workingNorm: number,
                          groupData: RowGroupData[],
                          compositions: ShiftComposition[][],
                          compositionIndex: number,
                          dayIndex: number) {
    for (let subCompositions of compositions) {
      for (let subComposition of subCompositions) {
        if (subComposition.shiftId === shiftId) {
          continue;
        }
        this.insertDataInGroup(groupData[subComposition.shiftId], subComposition,
          date, employee, workDay, workingNorm, false, dayIndex);
      }
    }
  }

  private isInComposition(date: string, composition: ShiftComposition): boolean {
    return moment(date).isBetween(composition.from, composition.to, 'date', '[]')
  }

  private getWorkingNorm(employeeCompositions: ShiftComposition[], workingNorms: WorkingNorm[]): number {
    if (employeeCompositions && employeeCompositions[0]) {
      let shiftId = employeeCompositions[0][0].shiftId;
      let shiftWorkingNorm = workingNorms.find(value => value.shiftId === shiftId);
      return shiftWorkingNorm ? shiftWorkingNorm.hours : 0;
    } else return 0;
  }
}

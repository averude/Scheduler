import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { WorkDay } from "../../model/workday";
import { DayType } from "../../model/day-type";
import { TableCellComponent } from "../../modules/admin/calendar/components/table-cell/table-cell.component";
import { QueryList } from "@angular/core";
import { DayTypeGroup } from "../../model/day-type-group";

export const parseDateOfEntities: OperatorFunction<any, any> =
  map((response: Array<any>) => response.map(value => {
    value.date = new Date(value.date);
    return value;
  }));

export function dateToISOString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

/* Note that it doesn't work on IE because the Number.EPSILON is undefined there*/
export function roundToTwo(num): number {
  return Math.round(num * 100 + Number.EPSILON)/100;
}

export function fillInTheCells(schedule: WorkDay[],
                               cells: QueryList<TableCellComponent>,
                               dayTypes?: DayType[],
                               dayTypeGroups?: DayTypeGroup[]): void {
  cells.forEach(cell => {
      let workDay = schedule.find(value => value.date === cell.day.isoString);
      transform(cell, workDay, dayTypes, dayTypeGroups);
    });
}

function transform(cell: TableCellComponent,
                   value: WorkDay,
                   dayTypes?: DayType[],
                   dayTypeGroups?: DayTypeGroup[]): void {
  if (value) {
    if (value.dayTypeId && dayTypes) {
      let dayType = dayTypes.find(item => item.id === value.dayTypeId);
      if (dayType) {
        if (dayTypeGroups) {
          setCellLabelColor(cell, dayType.dayTypeGroupId, dayTypeGroups);
        }
        if (dayType.label && dayType.label.length > 0){
          cell.value = dayType.label;
        } else {
          cell.value = value.hours;
        }
      } else {
        cell.value = value.hours;
      }
    } else {
      cell.value = value.hours;
    }
  } else {
    cell.value = '-';
  }
}

function setCellLabelColor(cell: TableCellComponent,
                           dayTypeGroupId: number,
                           dayTypeGroups: DayTypeGroup[]) {
  let group = dayTypeGroups.find(dayTypeGroup => dayTypeGroup.id === dayTypeGroupId);
  if (group) {
    cell.labelColor = group.color;
  }
}

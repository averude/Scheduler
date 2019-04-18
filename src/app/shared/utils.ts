import { ElementRef, QueryList } from "@angular/core";
import { TableCellComponent } from "../modules/admin/schedules/components/table-cell/table-cell.component";
import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

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

export function selectingLeft(startX: number,
                              endX: number,
                              viewChildren: QueryList<TableCellComponent>) {
  viewChildren
    .filter(child => isBeforePosition(child.elementRef, startX))
    .filter(child => isAfterPosition(child.elementRef, endX))
    .forEach(child => child.select());
}

export function selectingRight(startX: number,
                               endX: number,
                               viewChildren: QueryList<TableCellComponent>) {
  viewChildren
    .filter(child => isAfterPosition(child.elementRef, startX))
    .filter(child => isBeforePosition(child.elementRef, endX))
    .forEach(child => child.select());
}

function isAfterPosition(element: ElementRef, pos: number): boolean {
  let offsetLeft = element.nativeElement.offsetLeft;
  let offsetRight = offsetLeft + element.nativeElement.offsetWidth;
  return offsetLeft >= pos || offsetRight >= pos;
}

function isBeforePosition(element: ElementRef, pos: number) {
  let offsetLeft = element.nativeElement.offsetLeft;
  let offsetRight = offsetLeft + element.nativeElement.offsetWidth;
  return offsetLeft < pos;
}

import { ElementRef, QueryList } from "@angular/core";
import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";

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
  let offsetLeft = element.nativeElement.getBoundingClientRect().left;
  let offsetRight = offsetLeft + element.nativeElement.clientWidth;
  return offsetLeft >= pos || offsetRight >= pos;
}

function isBeforePosition(element: ElementRef, pos: number) {
  let offsetLeft = element.nativeElement.getBoundingClientRect().left;
  let offsetRight = offsetLeft + element.nativeElement.clientWidth;
  return offsetLeft < pos;
}

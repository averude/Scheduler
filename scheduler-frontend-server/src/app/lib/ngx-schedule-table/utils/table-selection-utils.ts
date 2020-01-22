import { ElementRef, QueryList } from "@angular/core";
import { SelectableCellDirective } from "../directives/selectable-cell.directive";

export function selectingLeft(startX: number,
                              endX: number,
                              viewChildren: QueryList<SelectableCellDirective>) {
  deselect(viewChildren);
  viewChildren
    .filter(child => isBeforePosition(child.element, startX))
    .filter(child => isAfterPosition(child.element, endX))
    .forEach(child => child.select());
}

export function selectingRight(startX: number,
                               endX: number,
                               viewChildren: QueryList<SelectableCellDirective>) {
  deselect(viewChildren);
  viewChildren
    .filter(child => isAfterPosition(child.element, startX))
    .filter(child => isBeforePosition(child.element, endX))
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

function deselect(viewChildren: QueryList<SelectableCellDirective>) {
  viewChildren
    .filter(child => child.selected)
    .forEach(child => child.deselect());
}

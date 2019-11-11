import { DayType } from "../../../../../../../model/day-type";
import { TableCellComponent } from "./table-cell.component";
import { ElementRef } from "@angular/core";

export function toggleClass(elementRef: ElementRef, className: string) {
  elementRef.nativeElement.classList.toggle(className);
}

export function setLabel(cell: TableCellComponent) {
  if (cell) {
    if (!cell.enabled) {
      cell.label = 'X';
      return;
    }
    if (cell.workDay) {
      if (cell.showHours || !cell.workDay.dayTypeId || !cell.dayTypes) {
        setHoursWithColor(cell);
      } else {
        setLabelWithColor(cell);
      }
    } else {
      cell.label = '-';
    }
  }
}

function setHoursWithColor(cell: TableCellComponent) {
  cell.label = cell.workDay.hours;
  if (cell.dayTypes) {
    let dayType = cell.dayTypes.find(item => item.id === cell.workDay.dayTypeId);
    if (dayType) {
      setLabelColor(cell, dayType);
    }
  }
}

function setLabelWithColor(cell: TableCellComponent) {
  if (cell.dayTypes) {
    let dayType = cell.dayTypes.find(item => item.id === cell.workDay.dayTypeId);
    if (dayType) {

      setLabelColor(cell, dayType);

      if (dayType.label && dayType.label.length > 0) {
        cell.label = dayType.label;
      } else {
        cell.label = cell.workDay.hours;
      }
    }
  }
}

function setLabelColor(cell: TableCellComponent,
                       dayType: DayType) {
  if (cell.dayTypeGroups) {
    let group = cell.dayTypeGroups
      .find(dayTypeGroup => dayTypeGroup.id === dayType.dayTypeGroupId);
    if (group) {
      cell.labelColor = group.color;
    }
  }
}

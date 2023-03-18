import { Injectable } from '@angular/core';
import { PatternUnit } from '../../../model/pattern-unit';
import { createOrUpdateCell } from "./schedule-generation-utils";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { DepartmentDayType } from "../../../model/department-day-type";
import { HasDayTypeAndTime } from "../../../model/interface/has-day-type-and-time";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerator {

  constructor() { }

  generateScheduleWithPattern(row: Row,
                              cells: Cell[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              onSave: (row: Row, selectedCells: Cell[]) => void,
                              onError: (message: string) => void) {
    this.generate(row, cells, patternUnits, offset, false, onSave, onError);
  }

  generateScheduleByUnit(row: Row,
                         cells: Cell[],
                         unit: HasDayTypeAndTime,
                         onSave: (row: Row, selectedCells: Cell[]) => void,
                         onError: (message: string) => void) {

    this.generate(row, cells, [unit], 0, false, onSave, onError);
  }

  generateScheduleByDepartmentDayType(row: Row,
                                      cells: Cell[],
                                      departmentDayType: DepartmentDayType,
                                      onSave: (row: Row, selectedCells: Cell[]) => void,
                                      onError: (message: string) => void) {
    this.generate(row, cells, [departmentDayType], 0, departmentDayType.dayType.usePreviousValue, onSave, onError);
  }

  private generate(row: Row,
                   cells: Cell[],
                   units: HasDayTypeAndTime[],
                   offset: number,
                   usePreviousValue: boolean,
                   onSave: (rowData: Row, selectedCells: Cell[]) => void,
                   onError: (message: string) => void) {
    if (!cells || !units || !(units.length > 0)) {
      onError('Illegal arguments');
      return;
    }

    const schedule = cells
      .filter(cell => cell.value);

    if (usePreviousValue) {
      if (schedule.length !== cells.length) {
        onError('Selected dates doesn\'t have schedule');
        return;
      }
    }

    const cellsNum = cells.length;
    const unitsSize = units.length;

    for (let i = 0; i < cellsNum; i += unitsSize) {
      for (let j = 0; j < unitsSize; j++) {
        const cell_index = i + j;

        if (cell_index >= cellsNum) {
          break;
        }

        const unit_index = (offset + j) % unitsSize;

        createOrUpdateCell(usePreviousValue, units[unit_index], cells[cell_index]);
      }
    }
    onSave(row, cells);
  }
}

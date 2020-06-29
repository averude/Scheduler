import { Injectable } from '@angular/core';
import { PatternUnit } from '../../model/pattern-unit';
import { createOrUpdateCell } from "./schedule-generation-utils";
import { RowData } from "../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { DepartmentDayType } from "../../model/department-day-type";
import { HasDayTypeIdAndTime } from "../../model/interface/has-day-type-id-and-time";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerator {

  constructor() { }

  generateScheduleWithPattern(rowData: RowData,
                              cells: CellData[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                              onError: (message: string) => void) {
    this.generate(rowData, cells, patternUnits, offset, false, onSave, onError);
  }

  generateScheduleByUnit(rowData: RowData,
                         cells: CellData[],
                         unit: HasDayTypeIdAndTime,
                         onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                         onError: (message: string) => void) {

    this.generate(rowData, cells, [unit], 0, false, onSave, onError);
  }

  generateScheduleByDepartmentDayType(rowData: RowData,
                                      cells: CellData[],
                                      departmentDayType: DepartmentDayType,
                                      onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                                      onError: (message: string) => void) {
    this.generate(rowData, cells, [departmentDayType], 0, departmentDayType.dayType.usePreviousValue, onSave, onError);
  }

  private generate(rowData: RowData,
                   cells: CellData[],
                   units: HasDayTypeIdAndTime[],
                   offset: number,
                   usePreviousValue: boolean,
                   onSave: (rowData: RowData, selectedCells: CellData[]) => void,
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

        createOrUpdateCell(
          usePreviousValue,
          rowData.id,
          units[unit_index],
          cells[cell_index]);
      }
    }
    onSave(rowData, cells);
  }
}

import { Injectable } from '@angular/core';
import { PatternUnit } from '../../model/pattern-unit';
import { createOrUpdateCell } from "./schedule-generation-utils";
import { RowData } from "../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { DepartmentDayType } from "../../model/department-day-type";

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

  generateScheduleByPatternUnit(rowData: RowData,
                                cells: CellData[],
                                unit: PatternUnit,
                                onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                                onError: (message: string) => void) {
    const customUnits: PatternUnit[] = [unit];

    this.generate(rowData, cells, customUnits, 0, false, onSave, onError);
  }

  generateScheduleBySingleDay(rowData: RowData,
                              cells: CellData[],
                              departmentDayType: DepartmentDayType,
                              onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                              onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.dayTypeId       = departmentDayType.dayType.id;
    patternUnit.startTime       = departmentDayType.startTime;
    patternUnit.endTime         = departmentDayType.endTime;
    patternUnit.breakStartTime  = departmentDayType.breakStartTime;
    patternUnit.breakEndTime    = departmentDayType.breakEndTime;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(rowData, cells, customUnits, 0, departmentDayType.dayType.usePreviousValue, onSave, onError);
  }

  private generate(rowData: RowData,
                   cells: CellData[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   usePreviousValue: boolean,
                   onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                   onError: (message: string) => void) {
    if (!cells || !patternUnits || !(patternUnits.length > 0)) {
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
    const unitsSize = patternUnits.length;

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
          patternUnits[unit_index],
          cells[cell_index]);
      }
    }
    onSave(rowData, cells);
  }
}
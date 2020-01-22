import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/pattern-unit';
import { DayType } from "../model/day-type";
import { createOrUpdateCell } from "../shared/utils/schedule-generation-utils";
import { RowData } from "../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../lib/ngx-schedule-table/model/data/cell-data";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleWithPattern(rowData: RowData,
                              cells: CellData[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              usePreviousValue: boolean,
                              onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                              onError: (message: string) => void) {
    this.generate(rowData, cells, patternUnits, offset, usePreviousValue, onSave, onError);
  }

  generateScheduleBySingleDay(rowData: RowData,
                              cells: CellData[],
                              hours: number,
                              dayType: DayType,
                              onSave: (rowData: RowData, selectedCells: CellData[]) => void,
                              onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.dayTypeId       = dayType.id;
    patternUnit.startTime       = dayType.startTime;
    patternUnit.endTime         = dayType.endTime;
    patternUnit.breakStartTime  = dayType.breakStartTime;
    patternUnit.breakEndTime    = dayType.breakEndTime;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(rowData, cells, customUnits, 0, dayType.usePreviousValue, onSave, onError);
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

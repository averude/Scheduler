import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/pattern-unit';
import { DayType } from "../model/day-type";
import { createOrUpdateCell } from "../shared/utils/schedule-generation-utils";
import { TableCellComponent } from "../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";
import { TableRowComponent } from "../modules/admin/schedule/components/calendar/components/table-row/table-row.component";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleWithPattern(row: TableRowComponent,
                              cells: TableCellComponent[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              overrideExistingValues: boolean,
                              onSave: (row: TableRowComponent, selectedCells: TableCellComponent[]) => void,
                              onError: (message: string) => void) {
    this.generate(row, cells, patternUnits, offset, overrideExistingValues, onSave, onError);
  }

  generateScheduleWithCustomHours(row: TableRowComponent,
                                  cells: TableCellComponent[],
                                  hours: number,
                                  onSave: (row: TableRowComponent, selectedCells: TableCellComponent[]) => void,
                                  onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(row, cells, customUnits, 0, true,  onSave, onError);
  }

  generateScheduleBySingleDay(row: TableRowComponent,
                              cells: TableCellComponent[],
                              hours: number,
                              dayType: DayType,
                              onSave: (row: TableRowComponent, selectedCells: TableCellComponent[]) => void,
                              onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    patternUnit.dayTypeId = dayType.id;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(row, cells, customUnits, 0, true, onSave, onError);
  }

  private generate(row: TableRowComponent,
                   cells: TableCellComponent[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   overrideExistingValues: boolean,
                   onSave: (row: TableRowComponent, selectedCells: TableCellComponent[]) => void,
                   onError: (message: string) => void) {
    if (!cells || !patternUnits || !(patternUnits.length > 0)) {
      onError('Illegal arguments');
      return;
    }

    const schedule = cells
      .filter(cell => cell.workDay)
      .map(cell => cell.workDay);

    if (!overrideExistingValues) {
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
          overrideExistingValues,
          row.employee.id,
          patternUnits[unit_index],
          cells[cell_index]);
      }
    }
    onSave(row, cells);
  }
}

import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/pattern-unit';
import { DayType } from "../model/day-type";
import { createOrUpdateCell } from "../shared/utils/schedule-generation-utils";
import { TableCellComponent } from "../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleWithPattern(employeeId: number,
                              cells: TableCellComponent[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              overrideExistingValues: boolean,
                              onSave: (cells: TableCellComponent[]) => void,
                              onError: (message: string) => void) {
    this.generate(employeeId, cells, patternUnits, offset, overrideExistingValues, onSave, onError);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  cells: TableCellComponent[],
                                  hours: number,
                                  onSave: (cells: TableCellComponent[]) => void,
                                  onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(employeeId, cells, customUnits, 0, true,  onSave, onError);
  }

  generateScheduleBySingleDay(employeeId: number,
                              cells: TableCellComponent[],
                              hours: number,
                              dayType: DayType,
                              onSave: (cells: TableCellComponent[]) => void,
                              onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    patternUnit.dayTypeId = dayType.id;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(employeeId, cells, customUnits, 0, true, onSave, onError);
  }

  private generate(employeeId: number,
                   cells: TableCellComponent[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   overrideExistingValues: boolean,
                   onSave: (cells: TableCellComponent[]) => void,
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
          employeeId,
          patternUnits[unit_index],
          cells[cell_index]);
      }
    }
    onSave(cells);
  }
}

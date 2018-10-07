import { Injectable } from '@angular/core';
import { TableCellComponent } from '../components/schedules/table-cell/table-cell.component';
import { PatternService } from './pattern.service';
import { DayType } from '../model/daytype';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor(private patternService: PatternService,
              private scheduleService: ScheduleService) { }

  generateSchedule(employeeId: number, cells: TableCellComponent[], patternId: number) {
    this.patternService.getDayTypes(patternId)
      .subscribe(dayTypes => {
        this.generate(employeeId, cells, dayTypes, 0);
      });
  }

  private generate(employeeId: number,
                   cells: TableCellComponent[],
                   dayTypes: DayType[],
                   offset: number) {
    const cellsNum = cells.length;
    const typesNum = dayTypes.length;
    for (let i = 0; i < cellsNum; i += typesNum) {
      for (let j = 0; j < typesNum; j++) {
        const cell_index = i + j;
        if (cell_index >= cellsNum) {
          break;
        }
        const type_index = (offset + j) % typesNum;
        cells[cell_index].workDay = {
          id: 0,
          employeeId: employeeId,
          holiday: false,
          hours: dayTypes[type_index].hours,
          date: cells[cell_index].day,
          label: dayTypes[type_index].label
        };
      }
    }
  }
}

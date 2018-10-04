import { Injectable } from '@angular/core';
import {TableCellComponent} from '../components/schedules/table-cell/table-cell.component';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateSchedule(employeeId: number, cells: TableCellComponent[], patternId: number) {
    cells.forEach(value => {
      value.workDay = {
        id: 0,
        date: value.day,
        employeeId: employeeId,
        holiday: false,
        hours: 8};
    });
  }
}

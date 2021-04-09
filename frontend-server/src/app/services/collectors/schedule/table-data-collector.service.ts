import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import * as moment from "moment";
import { ScheduleRowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { TableRowProcessor } from "./table-row-processor.service";

@Injectable()
export class TableDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private rowProcessor: TableRowProcessor) {}

  collect(shifts: Shift[],
          calendarDays: CalendarDay[],
          schedule: EmployeeScheduleDTO[],
          positions: Position[],
          workingNorms: WorkingNorm[]) {
    const table: TableData = new TableData();

    table.from  = moment.utc(calendarDays[0].isoString);
    table.to    = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    table.groups = shifts
      .sort((a, b) => a.id - b.id)
      .map(shift => {
        const group = new ScheduleRowGroup();
        group.table = table;
        group.id    = shift.id;
        group.name  = shift.name;
        group.rows  = [];
        return group;
      });

    for (let dto of schedule) {

      this.rowProcessor.fillRows(dto, calendarDays, dto.mainCompositions, false, positions,
        (composition => table.findRowGroup(composition.shiftId)),
        (composition => this.getWorkingNorm(workingNorms, composition.shiftId)));

      this.rowProcessor.fillRows(dto, calendarDays, dto.substitutionCompositions, true, positions,
        (composition => table.findRowGroup(composition.shiftId)),
        (composition => this.getWorkingNorm(workingNorms, composition.mainComposition.shiftId)))
    }

    return table;
  }

  private getWorkingNorm(workingNorms: WorkingNorm[], shiftId: number) {
    return binarySearch(workingNorms, (mid => mid.shiftId - shiftId))?.hours || 0;
  }
}

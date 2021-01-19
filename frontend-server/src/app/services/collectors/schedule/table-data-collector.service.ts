import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import * as moment from "moment";
import { RowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { TableRowProcessor } from "./table-row-processor.service";

@Injectable()
export class TableDataCollector {

  constructor(private divider: IntervalCreator,
              private rowProcessor: TableRowProcessor) {}

  collect(shifts: Shift[],
          calendarDays: CalendarDay[],
          schedule: EmployeeScheduleDTO[],
          positions: Position[],
          workingNorms: WorkingNorm[]) {
    const table: TableData = new TableData();

    const sortedShifts = shifts.sort((a, b) => a.id - b.id);

    table.from  = moment.utc(calendarDays[0].isoString);
    table.to    = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    table.groups = sortedShifts.map(shift => {
      const group = new RowGroup();
      group.table = table;
      group.id    = shift.id;
      group.name  = shift.name;
      group.rows  = [];
      return group;
    });

    schedule.forEach(dto => {

      dto.mainShiftCompositions.forEach(mainComposition => {
        const position = binarySearch(positions, (mid => mid.id - mainComposition.positionId));

        const rowGroup = table.findRowGroup(mainComposition.shiftId);
        if (rowGroup) {
          const workingNorm   = this.getWorkingNorm(workingNorms, mainComposition.shiftId);

          this.rowProcessor.initRowInsert(rowGroup, dto, calendarDays,
            mainComposition, position, workingNorm, false, (row) => row?.position.id === mainComposition.positionId);
        }
      });

      dto.substitutionShiftCompositions.forEach(substComposition => {
        const position = binarySearch(positions, (mid => mid.id - substComposition.positionId));

        const rowGroup = table.findRowGroup(substComposition.shiftId);
        if (rowGroup) {
          const workingNorm   = this.getWorkingNorm(workingNorms, substComposition.mainShiftComposition.shiftId);

          this.rowProcessor.initRowInsert(rowGroup, dto, calendarDays,
            substComposition, position, workingNorm, true, (row) => row?.position.id === substComposition.positionId);
        }
      });

    });

    return table;
  }

  private getWorkingNorm(workingNorms: WorkingNorm[], shiftId: number) {
    return binarySearch(workingNorms, (mid => mid.shiftId - shiftId))?.hours || 0;
  }
}

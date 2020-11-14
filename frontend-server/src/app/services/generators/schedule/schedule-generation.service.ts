import { ScheduleGenerator } from "./schedule-generator";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { WorkDay } from "../../../model/workday";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { ScheduleService } from "../../http/schedule.service";
import { NotificationsService } from "angular2-notifications";
import { Injectable } from "@angular/core";
import { PatternUnit } from "../../../model/pattern-unit";
import { DepartmentDayType } from "../../../model/department-day-type";
import { BasicDto } from "../../../model/dto/basic-dto";
import { ShiftPattern } from "../../../model/shift-pattern";
import { RowData } from "../../../lib/ngx-schedule-table/model/data/row-data";
import { HasDayTypeIdAndTime } from "../../../model/interface/has-day-type-id-and-time";

@Injectable()
export class ScheduleGenerationService {

  constructor(private rowRenderer: TableRenderer,
              private scheduleService: ScheduleService,
              private notificationService: NotificationsService,
              private scheduleGenerator: ScheduleGenerator) {}

  generateSchedule(dto: BasicDto<ShiftPattern, PatternUnit>,
                   data: SelectionData,
                   offset: number) {
    this.scheduleGenerator.generateScheduleWithPattern(
      data.rowData,
      data.selectedCells,
      dto.collection,
      offset,
      this.scheduleGeneratedHandler,
      this.errorHandler
    );
  }

  generateScheduleByUnit(unit: HasDayTypeIdAndTime,
                         data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleByUnit(
        data.rowData,
        data.selectedCells,
        unit,
        this.scheduleGeneratedHandler,
        this.errorHandler
      );
  }

  generateScheduleByDepartmentDayType(departmentDayType: DepartmentDayType,
                                      data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleByDepartmentDayType(
        data.rowData,
        data.selectedCells,
        departmentDayType,
        this.scheduleGeneratedHandler,
        this.errorHandler
      );
  }

  removeServiceDays(data: SelectionData) {
    if (data) {
      const serviceCells = data.selectedCells
        .filter(cell => cell.value.actualDayTypeId);
      if (serviceCells.length > 0) {
        serviceCells.forEach(cell => cell.value.actualDayTypeId = undefined);
        this.scheduleGeneratedHandler(data.rowData, data.selectedCells);
      } else {
        this.errorHandler('There are no service days');
      }
    }
  }

  private get scheduleGeneratedHandler(): (rowData, selectedCells) => void {
    return (rowData, selectedCells) => {

      const createdSchedule = selectedCells
        .filter(cell => !cell.value.id)
        .map(cell => cell.value);

      const updatedSchedule = selectedCells
        .filter(cell => cell.value.id)
        .map(cell => cell.value);

      if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(response => {
            this.updateCellData(rowData, response);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.updateCellData(rowData, updatedSchedule);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Updated',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
    };
  };

  private get errorHandler(): (message) => void {
    return (message) => this.notificationService.error('Error', message);
  }

  private updateCellData(rowData: RowData, schedule: WorkDay[]) {
    let cellData = rowData.cellData;
    let newCellData = [];
    for (let cellIdx = 0, schedIdx = 0; cellIdx < cellData.length; cellIdx++) {

      let cell = Object.assign({}, cellData[cellIdx]);
      newCellData[cellIdx] = cell;

      if (schedIdx < schedule.length) {
        let value = schedule[schedIdx];
        if (cell.date.isoString == value.date) {
          schedIdx++;
          newCellData[cellIdx].value = value;
        }
      }
    }
    rowData.cellData = newCellData;
  }
}

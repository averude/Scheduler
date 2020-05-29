import { ScheduleGenerator } from "./schedule-generator";
import { SelectionData } from "../../lib/ngx-schedule-table/model/selection-data";
import { WorkDay } from "../../model/workday";
import * as moment from 'moment';
import { TableRenderer } from "../../lib/ngx-schedule-table/service/table-renderer.service";
import { ScheduleService } from "../../http-services/schedule.service";
import { NotificationsService } from "angular2-notifications";
import { Injectable } from "@angular/core";
import { PatternUnit } from "../../model/pattern-unit";
import { DepartmentDayType } from "../../model/department-day-type";
import { BasicDto } from "../../model/dto/basic-dto";
import { ShiftPattern } from "../../model/shift-pattern";

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

  generateScheduleByPatternUnit(unit: PatternUnit,
                                data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleByPatternUnit(
        data.rowData,
        data.selectedCells,
        unit,
        this.scheduleGeneratedHandler,
        this.errorHandler
      );
  }

  generateScheduleBySingleDay(departmentDayType: DepartmentDayType,
                              data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleBySingleDay(
        data.rowData,
        data.selectedCells,
        departmentDayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
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
            this.createSchedule(rowData.workDays, response);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.updateSchedule(rowData.workDays, updatedSchedule);
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

  private createSchedule(schedule: WorkDay[], createdSchedule: WorkDay[]) {
    createdSchedule.forEach(workDay => schedule.push(workDay));
    schedule.sort(((a, b) => moment(a.date).diff(moment(b.date))));
  }

  private updateSchedule(schedule: WorkDay[], updatedSchedule: WorkDay[]) {
    for (let scheduleIdx = 0, updatedScheduleIdx = 0; scheduleIdx < schedule.length; scheduleIdx++) {
      if (updatedScheduleIdx >= updatedSchedule.length) {
        break;
      }

      let oldValue = schedule[scheduleIdx];
      let newValue = updatedSchedule[updatedScheduleIdx];

      if (oldValue.date === newValue.date) {
        updatedScheduleIdx++;
        schedule[scheduleIdx] = newValue;
      }
    }
  }
}

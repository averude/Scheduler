import { ScheduleGenerator } from "./schedule-generator";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { ScheduleService } from "../../http/schedule.service";
import { NotificationsService } from "angular2-notifications";
import { Injectable } from "@angular/core";
import { PatternUnit } from "../../../model/pattern-unit";
import { DepartmentDayType } from "../../../model/department-day-type";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { ShiftPattern } from "../../../model/shift-pattern";
import { HasDayTypeAndTime } from "../../../model/interface/has-day-type-and-time";
import { CellUpdater } from "../../collectors/cell-updater";
import { ScheduleCell } from "../../../model/ui/schedule-table/table-data";
import { createOrUpdateCell } from "./schedule-generation-utils";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";

@Injectable()
export class ScheduleGenerationService {

  constructor(private cellUpdater: CellUpdater,
              private rowRenderer: TableRenderer,
              private scheduleService: ScheduleService,
              private notificationService: NotificationsService,
              private scheduleGenerator: ScheduleGenerator) {}

  generateSchedule(dto: BasicDTO<ShiftPattern, PatternUnit>,
                   data: SelectionData,
                   offset: number) {
    this.scheduleGenerator.generateScheduleWithPattern(
      data.row,
      data.selectedCells,
      dto.collection,
      offset,
      this.scheduleGeneratedHandler,
      this.error403Handler
    );
  }

  generateScheduleByUnit(unit: HasDayTypeAndTime,
                         data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleByUnit(
        data.row,
        data.selectedCells,
        unit,
        this.scheduleGeneratedHandler,
        this.error403Handler
      );
  }

  generateScheduleByDepartmentDayType(departmentDayType: DepartmentDayType,
                                      data: SelectionData) {
    this.scheduleGenerator
      .generateScheduleByDepartmentDayType(
        data.row,
        data.selectedCells,
        departmentDayType,
        this.scheduleGeneratedHandler,
        this.error403Handler
      );
  }

  removeServiceDays(data: SelectionData) {
    if (data) {
      const serviceCells = data.selectedCells
        .filter(cell => cell.value.actualDayTypeId);
      if (serviceCells.length > 0) {
        serviceCells.forEach(cell => cell.value.actualDayTypeId = undefined);
        this.scheduleGeneratedHandler(data.row, data.selectedCells);
      } else {
        this.error403Handler('There are no service days');
      }
    }
  }

  private get scheduleGeneratedHandler(): (row, selectedCells) => void {
    return (row: Row, selectedCells: ScheduleCell[]) => {

      const createdSchedule = selectedCells
        .filter(cell => !cell.value.id)
        .map(cell => cell.value);

      const updatedSchedule = selectedCells
        .filter(cell => cell.value.id)
        .map(cell => cell.value);

      if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(response => {
            this.cellUpdater.updateCellData(row.cells, response);
            this.rowRenderer.renderRow(row.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, this.error403Handler);
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.cellUpdater.updateCellData(row.cells, updatedSchedule);
            this.rowRenderer.renderRow(row.id);
            this.notificationService.success(
              'Updated',
              'Schedule sent successfully');
          }, this.error403Handler);
      }
    };
  };

  generateForCells(departmentDayType: DepartmentDayType, cells: ScheduleCell[]) {
    cells.forEach(cell =>
      createOrUpdateCell(false, departmentDayType, cell));

    const updated = cells.filter(cell => cell.value.id);
    const created = cells.filter(cell => !cell.value.id);

    const obs = [];

    if (updated && updated.length > 0) {
      obs.push(this.scheduleService.update(updated.map(value => value.value))
        .pipe(tap(updatedSchedule => updated.forEach(cell =>
          this.rowRenderer.renderRow(cell.row.id)))));
    }

    if (created && created.length > 0) {
      obs.push(this.scheduleService.create(created.map(value => value.value))
        .pipe(tap(createdSchedule => created.forEach((cell, index) => {
          this.rowRenderer.renderRow(cell.row.id);
          created[index].value.id = createdSchedule[index].id;
        }))));
    }

    if (obs && obs.length > 0) {
      forkJoin(obs).subscribe(([updatedSchedule, createdSchedule]) => {
        this.notificationService.success("Success");
      }, this.error403Handler);
    }
  }

  private get errorHandler(): (message) => void {
    return (message) => this.notificationService.error('Error', message);
  }

  error403Handler = (err) => {
    if (err.status == 403) {
      this.notificationService.error("Access denied",
        "You are not permitted to change the schedule of the previous months");
    }
  };
}

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
import { Cell } from "../../../model/ui/schedule-table/table-data";
import { createOrUpdateCell } from "./schedule-generation-utils";
import { forkJoin } from "rxjs";

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
      data.rowData,
      data.selectedCells,
      dto.collection,
      offset,
      this.scheduleGeneratedHandler,
      this.errorHandler
    );
  }

  generateScheduleByUnit(unit: HasDayTypeAndTime,
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
            this.cellUpdater.updateCellData(rowData.cellData, response);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.cellUpdater.updateCellData(rowData.cellData, updatedSchedule);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Updated',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
    };
  };

  generateForCells(departmentDayType: DepartmentDayType, cells: Cell[]) {
    cells.forEach(cell => {
      const employeeId = cell.row.id;
      createOrUpdateCell(false, employeeId, departmentDayType, cell);
    });

    const updated = cells.filter(cell => cell.value.id);
    const created = cells.filter(cell => !cell.value.id);

    const obs = [
      this.scheduleService.update(updated.map(value => value.value)),
      this.scheduleService.create(created.map(value => value.value))
    ];

    forkJoin(obs).subscribe(([updatedSchedule, createdSchedule]) => {
      updated.forEach(cell => this.rowRenderer.renderRow(cell.row.id));
      created.forEach((cell, index) => {
        this.rowRenderer.renderRow(cell.row.id);
        created[index].value.id = createdSchedule[index].id;
      });
      this.notificationService.success("Success");
    });
  }

  private get errorHandler(): (message) => void {
    return (message) => this.notificationService.error('Error', message);
  }
}

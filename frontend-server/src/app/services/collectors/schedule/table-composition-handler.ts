import { Composition, MainShiftComposition, SubstitutionShiftComposition } from "../../../model/main-shift-composition";
import { Position } from "../../../model/position";
import { Row, RowGroup } from "../../../model/ui/schedule-table/table-data";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { MainShiftCompositionService } from "../../http/main-shift-composition.service";
import { SubstitutionShiftCompositionService } from "../../http/substitution-shift-composition.service";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableRowProcessor } from "./table-row-processor.service";
import { NotificationsService } from "angular2-notifications";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { TableRowRemover } from "./table-row-remover";

@Injectable()
export class TableCompositionHandler {

  constructor(private tableRenderer: TableRenderer,
              private rowRemover: TableRowRemover,
              private rowProcessor: TableRowProcessor,
              private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private mainShiftCompositionService: MainShiftCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private notificationsService: NotificationsService) {}

  createOrUpdateComposition(compositions: Composition[],
                            rowGroup:     RowGroup,
                            row:          Row,
                            parentRow:    Row,
                            scheduleDTOs: EmployeeScheduleDTO[],
                            positions:    Position[],
                            workingNorms: WorkingNorm[],
                            calendarDays: CalendarDay[],
                            isSubstitution: boolean) {
    if (compositions) {

      if (isSubstitution) {

        compositions.forEach(composition => {
          if (composition.id) {
            this.substitutionShiftCompositionService.update(<SubstitutionShiftComposition> composition)
              .subscribe((res) => {
                const position = binarySearch(positions, (mid => mid.id - composition.positionId));
                this.updateRow(scheduleDTOs, calendarDays, composition, position, rowGroup, row);
              });
          } else {
            this.substitutionShiftCompositionService.create(<SubstitutionShiftComposition> composition)
              .subscribe((id) => {
                composition.id = id;

                const position = binarySearch(positions, (mid => mid.id - composition.positionId));
                this.createRow(scheduleDTOs, workingNorms, calendarDays,
                  composition, position, rowGroup, isSubstitution, parentRow);
              });
          }
        });

      } else {

        compositions.forEach(composition => {
          if (composition.id) {
            this.mainShiftCompositionService.update(composition)
              .subscribe((res) => {
                const position = binarySearch(positions, (mid => mid.id - composition.positionId));
                this.updateRow(scheduleDTOs, calendarDays, composition, position, rowGroup, row);
              });
          } else {
            this.mainShiftCompositionService.create(composition)
              .subscribe((id) => {
                composition.id = id;

                const position = binarySearch(positions, (mid => mid.id - composition.positionId));
                this.createRow(scheduleDTOs, workingNorms, calendarDays,
                  composition, position, rowGroup, isSubstitution);
              });
          }
        });

      }

    }
  }

  removeComposition(groupData: RowGroup,
                    row: Row,
                    scheduleDTOs: EmployeeScheduleDTO[],
                    compositions: Composition[]) {
    compositions.forEach(composition => {
      if (composition.id) {
        if (row.isSubstitution) {
          this.substitutionShiftCompositionService.delete(composition.id)
            .subscribe(res => this.rowRemover.removeRow(groupData, row, composition, scheduleDTOs));
        } else {
          this.mainShiftCompositionService.delete(composition.id)
            .subscribe(res => this.rowRemover.removeRow(groupData, row, composition, scheduleDTOs));
        }
      }
    });
  }

  private createRow(scheduleDTOs: EmployeeScheduleDTO[],
                    workingNorms: WorkingNorm[],
                    calendarDays: CalendarDay[],
                    composition: Composition,
                    position: Position,
                    group: RowGroup,
                    isSubstitution: boolean,
                    parentRow?: Row) {
    if (scheduleDTOs && calendarDays) {

      const dto   = binarySearch(scheduleDTOs, (mid => mid.parent.id - composition.employeeId));
      const norm  = binarySearch(workingNorms, (mid => mid.shiftId - group.id))?.hours || 0;

      if (isSubstitution) {
        dto.substitutionShiftCompositions.push(<SubstitutionShiftComposition> composition);
        dto.substitutionShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
      } else {
        dto.mainShiftCompositions.push(<MainShiftComposition> composition);
        dto.mainShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
      }

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, calendarDays,
        composition, position, norm, isSubstitution,
        (row) => row.position.id === composition.positionId);

      if (isSubstitution) {
        if (parentRow) {
          parentRow.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(parentRow.compositions, dto.substitutionShiftCompositions);
          this.cellEnabledSetter.processRow(parentRow, group.table.from, group.table.to);
        }
        row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
      } else {
        row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
      }

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRowGroup(group.id);
      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Created');
    }
  }

  private updateRow(scheduleDTOs: EmployeeScheduleDTO[],
                    calendarDays: CalendarDay[],
                    composition: Composition,
                    position: Position,
                    group: RowGroup,
                    row: Row) {
    if (!row) {
      throw new Error("No row provided");
    }

    if (scheduleDTOs && calendarDays) {
      const dto = binarySearch(scheduleDTOs, (mid => mid.parent.id - composition.employeeId));

      if (row.position.id !== composition.positionId) {

        const group = row.group;
        const rowToMerge = <Row> group.rows
          .find((value: Row) => value.id === composition.employeeId
            && value.position.id === composition.positionId
            && value.isSubstitution === row.isSubstitution);

        if (rowToMerge) {
          this.transfer(row, rowToMerge, composition, dto);
        } else {
          const newRow = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, calendarDays, composition,
            position, row.workingNorm, row.isSubstitution, () => false);
          newRow.compositions = [];
          newRow.intervals    = [];

          this.transfer(row, newRow, composition, dto);

          this.tableRenderer.renderRowGroup(group.id);
        }
      } else {
        this.rowProcessor.updateRow(row, composition, dto);
      }

      if (row.isSubstitution) {
        const mainShiftComposition = (<SubstitutionShiftComposition> composition).mainShiftComposition;
        const rows = <Row[]> group.table.findRowGroup(mainShiftComposition.shiftId).rows;

        for (let otherGroupMainRow of rows) {

          if (otherGroupMainRow.id === mainShiftComposition.employeeId && !otherGroupMainRow.isSubstitution) {
            otherGroupMainRow.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(otherGroupMainRow.compositions, dto.substitutionShiftCompositions);
            this.cellEnabledSetter.processRow(otherGroupMainRow, group.table.from, group.table.to);
          }
        }
      }

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Updated');
    }
  }

  private transfer(from: Row,
                   to: Row,
                   composition: Composition,
                   dto: EmployeeScheduleDTO){

    this.rowRemover.removeCompositionAndInterval(from, composition);

    to.compositions.push(composition);
    to.compositions.sort((a, b) => a.from.diff(b.from));

    this.intervalCreator.recalculate(from, dto);
    this.intervalCreator.recalculate(to, dto);

    this.cellEnabledSetter.process(from);
    this.cellEnabledSetter.process(to);
  }
}

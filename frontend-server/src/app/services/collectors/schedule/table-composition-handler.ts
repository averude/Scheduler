import { Composition, MainShiftComposition, SubstitutionShiftComposition } from "../../../model/main-shift-composition";
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
import { CompositionDivider } from "../../divider/composition-divider.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { TableRowRemover } from "./table-row-remover";

@Injectable()
export class TableCompositionHandler {

  constructor(private tableRenderer: TableRenderer,
              private rowRemover: TableRowRemover,
              private rowProcessor: TableRowProcessor,
              private divider: CompositionDivider,
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
                            workingNorms: WorkingNorm[],
                            calendarDays: CalendarDay[],
                            isSubstitution: boolean) {
    if (compositions) {

      if (isSubstitution) {

        compositions.forEach(composition => {
          if (composition.id) {
            this.substitutionShiftCompositionService.update(<SubstitutionShiftComposition> composition)
              .subscribe((res) => {
                this.updateRow(scheduleDTOs, calendarDays, composition, rowGroup, row);
              });
          } else {
            this.substitutionShiftCompositionService.create(<SubstitutionShiftComposition> composition)
              .subscribe((id) => {
                composition.id = id;
                this.createRow(scheduleDTOs, workingNorms, calendarDays, composition, rowGroup, isSubstitution, parentRow);
              });
          }
        });

      } else {

        compositions.forEach(composition => {
          if (composition.id) {
            this.mainShiftCompositionService.update(composition)
              .subscribe((res) => {
                this.updateRow(scheduleDTOs, calendarDays, composition, rowGroup, row);
              });
          } else {
            this.mainShiftCompositionService.create(composition)
              .subscribe((id) => {
                composition.id = id;
                this.createRow(scheduleDTOs, workingNorms, calendarDays, composition, rowGroup, isSubstitution);
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
                    group: RowGroup,
                    isSubstitution: boolean,
                    parentRow?: Row) {
    if (scheduleDTOs && calendarDays) {

      const dto   = binarySearch(scheduleDTOs, (mid => mid.parent.id - composition.employee.id));
      const norm  = binarySearch(workingNorms, (mid => mid.shiftId - group.id))?.hours || 0;

      if (isSubstitution) {
        dto.substitutionShiftCompositions.push(<SubstitutionShiftComposition> composition);
        dto.substitutionShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
      } else {
        dto.mainShiftCompositions.push(<MainShiftComposition> composition);
        dto.mainShiftCompositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
      }

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, calendarDays, composition, norm, isSubstitution, () => false);

      if (isSubstitution) {
        if (parentRow) {
          parentRow.intervals = this.divider.getRowIntervalsByArr(parentRow.compositions, dto.substitutionShiftCompositions);
          this.cellEnabledSetter.processRow(parentRow, group.table.from, group.table.to);
        }
        row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
      } else {
        row.intervals = this.divider.getRowIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
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
                    group: RowGroup,
                    row: Row) {
    if (!row) {
      throw new Error("No row provided");
    }

    if (scheduleDTOs && calendarDays) {
      const dto = binarySearch(scheduleDTOs, (mid => mid.parent.id - composition.employee.id));

      this.rowProcessor.updateRow(row, composition, dto);

      if (row.isSubstitution) {
        const mainShiftComposition = (<SubstitutionShiftComposition> composition).mainShiftComposition;
        const rows = <Row[]> group.table.findRowGroup(mainShiftComposition.shiftId).rows;

        for (let otherGroupRow of rows) {

          if (otherGroupRow.id === mainShiftComposition.employee.id && !otherGroupRow.isSubstitution) {
            otherGroupRow.intervals = this.divider.getRowIntervalsByArr(otherGroupRow.compositions, dto.substitutionShiftCompositions);
            this.cellEnabledSetter.processRow(otherGroupRow, group.table.from, group.table.to);
          }
        }
      }

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Updated');
    }
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { YearPaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/year-pagination-strategy";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { from, Subscription } from "rxjs";
import { WorkingNormService } from "../../../../../../../services/http/working-norm.service";
import { RowData } from "../../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { WorkingNormTableDataCollector } from "../../../../../../../services/collectors/working-norm/working-norm-table-data-collector.service";
import { WorkingNormCellLabelSetter } from "../utils/working-norm-cell-label-setter.service";
import { ClearSelectionService } from "../../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Shift } from "../../../../../../../model/shift";
import { WorkingNormDialogComponent } from "../working-time-dialog/working-norm-dialog.component";
import { SelectionData } from "../../../../../../../lib/ngx-schedule-table/model/selection-data";
import { WorkingNorm } from "../../../../../../../model/working-norm";
import { TableRenderer } from "../../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { NotificationsService } from "angular2-notifications";
import { ShiftGenerationUnit } from "../../../../../../../model/ui/shift-generation-unit";
import { getGenerationUnits, toGenerationDto } from "../../../../../../../lib/avr-entity-generation/util/utils";
import { concatMap } from "rxjs/operators";
import { TableSumCalculator } from "../../../../../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../../../../../services/http/auth.service";

@Component({
  selector: 'app-working-norm-table',
  templateUrl: './working-norm-table.component.html',
  styleUrls: ['./working-norm-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkingNormTableComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  rowData:  RowData[] = [];
  private shifts:   Shift[]   = [];

  generationUnits: ShiftGenerationUnit[] = [];

  private paginatorSub:     Subscription;
  private selectionEndSub:  Subscription;
  private rowRenderSub: Subscription;

  constructor(private authService: AuthService,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              public cellLabelSetter: WorkingNormCellLabelSetter,
              public paginationStrategy: YearPaginationStrategy,
              private dataCollector: WorkingNormTableDataCollector,
              private paginationService: PaginationService,
              private workingNormService: WorkingNormService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    this.paginatorSub = this.paginationService.onValueChange
      .subscribe(months => this.workingNormService
        .getAllDto(months[0].isoString, months[months.length - 1].isoString)
        .subscribe(dtos => {
          this.shifts = dtos.map(dto => dto.parent);
          this.generationUnits = getGenerationUnits(this.shifts);
          this.rowData = this.dataCollector.getRowData(months, dtos);
          this.sumCalculator.calculateHoursNormSum(this.rowData);
          this.cd.markForCheck();
        }));

    if (this.isAdmin) {
      this.selectionEndSub = this.selectionEndService.onSelectionEnd
        .subscribe(selectionData => {
          if (selectionData.selectedCells && selectionData.selectedCells.length > 0) {
            this.openDialog(selectionData);
          }
        });
    }

    this.rowRenderSub = this.tableRenderer.onRenderRow
      .subscribe(rowId => this.sumCalculator.calculateHoursNormSum(this.rowData, rowId));
  }

  ngOnDestroy() {
    this.paginationService.clearStoredValue();
    if (this.paginatorSub) this.paginatorSub.unsubscribe();
    if (this.selectionEndSub) this.selectionEndSub.unsubscribe();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
  }

  openDialog(selectionData: SelectionData) {
    const config = new MatDialogConfig();
    config.data = selectionData;
    config.hasBackdrop = true;

    this.dialog.open(WorkingNormDialogComponent, config)
      .afterClosed().subscribe(workingNorm => {
        this.rowClearSelection.clearSelection();
        if (workingNorm) {
          if (workingNorm.id) {
            this.workingNormService.update(workingNorm)
              .subscribe(res => {
                this.updateCellData(selectionData.rowData, workingNorm);
                this.tableRenderer.renderRow(selectionData.rowData.id);
              })
          } else {
            this.workingNormService.create(workingNorm)
              .subscribe(res => {
                workingNorm.id = res;
                this.updateCellData(selectionData.rowData, workingNorm);
                this.tableRenderer.renderRow(selectionData.rowData.id);
              });
          }
        }
    });
  }

  private updateCellData(rowData: RowData, workingNorm: WorkingNorm) {
    let cellData = rowData.cellData;
    let newCellData = [];
    for (let cellIdx = 0; cellIdx < cellData.length; cellIdx++) {

      let cell = Object.assign({}, cellData[cellIdx]);
      newCellData[cellIdx] = cell;

      if (cell.date.isoString === workingNorm.date) {
        newCellData[cellIdx].value = workingNorm;
      }
    }
    rowData.cellData = newCellData;
  }

  onWorkingNormGenerated(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.workingNormService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}

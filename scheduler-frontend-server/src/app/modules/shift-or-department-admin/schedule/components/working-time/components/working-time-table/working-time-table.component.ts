import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { YearPaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/year-pagination-strategy";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { from, Subscription } from "rxjs";
import { WorkingTimeService } from "../../../../../../../services/http/working-time.service";
import { RowData } from "../../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { WorkingTimeTableDataCollector } from "../collectors/working-time-table-data-collector";
import { WorkingTimeCellLabelSetter } from "../utils/working-time-cell-label-setter";
import { ClearSelectionService } from "../../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Shift } from "../../../../../../../model/shift";
import { WorkingTimeDialogComponent } from "../working-time-dialog/working-time-dialog.component";
import { SelectionData } from "../../../../../../../lib/ngx-schedule-table/model/selection-data";
import { WorkingTime } from "../../../../../../../model/working-time";
import { TableRenderer } from "../../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { NotificationsService } from "angular2-notifications";
import { ShiftGenerationUnit } from "../../../../../../../model/ui/shift-generation-unit";
import { getGenerationUnits, toGenerationDto } from "../../../../../../../lib/avr-entity-generation/util/utils";
import { concatMap } from "rxjs/operators";

@Component({
  selector: 'app-working-time-table',
  templateUrl: './working-time-table.component.html',
  styleUrls: ['./working-time-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkingTimeTableComponent implements OnInit, OnDestroy {

  rowData:  RowData[] = [];
  private shifts:   Shift[]   = [];

  generationUnits: ShiftGenerationUnit[] = [];

  private paginatorSub:     Subscription;
  private selectionEndSub:  Subscription;

  constructor(private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private tableRenderer: TableRenderer,
              public cellLabelSetter: WorkingTimeCellLabelSetter,
              public paginationStrategy: YearPaginationStrategy,
              private dataCollector: WorkingTimeTableDataCollector,
              private paginationService: PaginationService,
              private workingTimeService: WorkingTimeService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.paginatorSub = this.paginationService.onValueChange
      .subscribe(months => this.workingTimeService
        .getAllDto(months[0].isoString, months[months.length - 1].isoString)
        .subscribe(dtos => {
          this.shifts = dtos.map(dto => dto.parent);
          this.generationUnits = getGenerationUnits(this.shifts);
          this.rowData = this.dataCollector.getRowData(months, dtos);
          this.cd.markForCheck();
        }));

    this.selectionEndSub = this.selectionEndService.onSelectionEnd
      .subscribe(selectionData => {
        if (selectionData.selectedCells && selectionData.selectedCells.length > 0) {
          this.openDialog(selectionData);
        }
      });
  }

  ngOnDestroy() {
    this.paginationService.clearStoredValue();
    if (this.paginatorSub) this.paginatorSub.unsubscribe();
    if (this.selectionEndSub) this.selectionEndSub.unsubscribe();
  }

  calculateSum(rowData: RowData) {
    if (rowData) {
      return rowData.cellData
        .map(cell => (cell.value) ? cell.value.hours : 0)
        .reduce((prev, curr) => prev + curr, 0);
    }
  }

  openDialog(selectionData: SelectionData) {
    const config = new MatDialogConfig();
    config.data = selectionData;
    config.hasBackdrop = false;

    this.dialog.open(WorkingTimeDialogComponent, config)
      .afterClosed().subscribe(workingTime => {
        this.rowClearSelection.clearSelection();
        if (workingTime) {
          if (workingTime.id) {
            this.workingTimeService.update(workingTime)
              .subscribe(res => {
                this.updateCellData(selectionData.rowData, workingTime);
                this.tableRenderer.renderRow(selectionData.rowData.id);
              })
          } else {
            this.workingTimeService.create(workingTime)
              .subscribe(res => {
                workingTime.id = res;
                this.updateCellData(selectionData.rowData, workingTime);
                this.tableRenderer.renderRow(selectionData.rowData.id);
              });
          }
        }
    });
  }

  private updateCellData(rowData: RowData, workingTime: WorkingTime) {
    let cellData = rowData.cellData;
    let newCellData = [];
    for (let cellIdx = 0; cellIdx < cellData.length; cellIdx++) {

      let cell = Object.assign({}, cellData[cellIdx]);
      newCellData[cellIdx] = cell;

      if (cell.date === workingTime.date) {
        newCellData[cellIdx].value = workingTime;
      }
    }
    rowData.cellData = newCellData;
  }

  onWorkingTimeGenerated(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.workingTimeService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}

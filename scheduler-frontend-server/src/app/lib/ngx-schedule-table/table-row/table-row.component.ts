import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { RowRendererService } from "../service/row-renderer.service";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ClearSelectionService } from "../service/clear-selection.service";
import { CalendarDay } from "../model/calendar-day";
import { SelectableRowDirective } from "../directives/selectable-row.directive";
import { RowData } from "../model/data/row-data";
import { CellCollector } from "../collectors/cell-collector";
import { CellData } from "../model/data/cell-data";
import { DatePaginationService } from "../service/date-pagination.service";
import { CellLabelSetter } from "../utils/cell-label-setter";
import { SelectionEndService } from "../service/selection-end.service";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { DatedCellDef } from "../directives/cell";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit, OnDestroy {

  @Input() datedCellDef:      DatedCellDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() rowGroupId:      number;
  @Input() rowData:         RowData;
  @Input() cellCollector:   CellCollector<any, any>;
  @Input() cellLabelSetter: CellLabelSetter;

  daysInMonth:      CalendarDay[];
  cellData:         CellData[];

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  private rowRenderSub:     Subscription;
  private allRowRenderSub:  Subscription;
  private rowClearSub:      Subscription;
  private paginatorSub:     Subscription;

  constructor(public elementRef: ElementRef,
              private paginatorService: DatePaginationService,
              private cd: ChangeDetectorRef,
              private rowRenderer: RowRendererService,
              private selectionEndService: SelectionEndService,
              private rowClearSelection: ClearSelectionService) { }

  ngOnInit() {
    this.rowRenderSub = this.rowRenderer.onRenderRow
      .pipe(filter(rowDataId => this.rowData.id === rowDataId))
      .subscribe(() => this.getCells());

    this.allRowRenderSub = this.rowRenderer.onRenderAllRows
      .subscribe(() => this.getCells());

    this.rowClearSub = this.rowClearSelection.onClearSelection()
      .subscribe(() => this.clearSelection());

    this.paginatorSub = this.paginatorService.dates
      .subscribe(daysInMonth => {
        if (!this.daysInMonth) {
          this.daysInMonth = daysInMonth;
          this.getCells();
        } else {
          this.daysInMonth = daysInMonth;
        }
      });
  }

  ngOnDestroy(): void {
    this.rowRenderSub.unsubscribe();
    this.allRowRenderSub.unsubscribe();
    this.rowClearSub.unsubscribe();
    this.paginatorSub.unsubscribe();
  }

  onSelectionEnd($event: MouseEvent,
                 selectedCells: CellData[]): void {
    this.selectionEndService.endSelection($event, this.rowData, selectedCells);
  }

  clearSelection() {
    this.selectableRowDirective.clearSelection();
  }

  getCells() {
    if (!this.rowGroupId || !this.rowData || !this.daysInMonth) {
      return;
    }

    this.cellData = this.cellCollector.collect(this.rowGroupId, this.rowData, this.daysInMonth);
    this.cd.markForCheck();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { PaginationService } from "../service/pagination.service";
import { RowGroupData } from "../model/data/row-group-data";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { DatedCellDef } from "../directives/cell";
import { Subscription } from "rxjs";
import { CellLabelSetter } from "../utils/cell-label-setter";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnDestroy {
  numberOfColumns:  number;

  @Input() selectionDisabled: boolean;
  @Input() multipleSelect: boolean;

  @Input() datedCellDef:      DatedCellDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:         RowGroupData;

  @Input() cellLabelSetter:   CellLabelSetter;

  private paginatorSub: Subscription;

  isHidden: boolean = false;

  constructor(private paginatorService: PaginationService,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => {
        this.numberOfColumns = 1 + daysInMonth.length + this.afterDateColumns.length;
      });
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }
}

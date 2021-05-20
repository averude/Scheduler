import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { TableStateService } from "../../../lib/ngx-schedule-table/service/table-state.service";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Subscription } from "rxjs";
import { ScheduleCellLabelPipe } from "../utils/schedule-cell-label-pipe";
import { DayType } from "../../../model/day-type";

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellComponent implements OnInit, OnChanges, OnDestroy {

  private currValue: any;
  private prevValue: any;

  @Input() set value(value: any) {
    this.prevValue = this.currValue;
    this.currValue = value;
  }

  get value() {
    return this.currValue;
  }

  @Input() cellData: Cell;

  @Input() labelColor = "transparent";

  @Input() dayTypeMap: Map<number, DayType>;

  cellState: number;
  label: string | number = '-';

  private cellStateSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private cellLabelSetter: ScheduleCellLabelPipe,
              private cellStateService: TableStateService) {
  }

  ngOnInit() {
    this.cellStateSub = this.cellStateService.isCellShown.subscribe(state => {
      this.cellState = state;
      if (this.value) {
        this.refreshLabel();
      }
    });
  }

  ngOnDestroy(): void {
    this.cellStateSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.labelColor = "transparent";
      this.cellLabelSetter.setLabel(this, this.dayTypeMap);
    }
  }

  revertChanges() {
    this.currValue = this.prevValue;
    this.refreshLabel();
  }

  refreshLabel() {
    this.labelColor = "transparent";
    this.cellLabelSetter.setLabel(this, this.dayTypeMap);
    this.cd.markForCheck();
  }
}

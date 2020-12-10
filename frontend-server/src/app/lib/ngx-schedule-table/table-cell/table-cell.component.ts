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
import { TableStateService } from "../service/table-state.service";
import { CellData } from "../model/data/cell-data";
import { CellLabelSetter } from "../utils/cell-label-setter";
import { Subscription } from "rxjs";

@Component({
  selector: '[app-table-cell]',
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

  @Input() cellData:        CellData;
  @Input() cellLabelSetter: CellLabelSetter;

  @Input() labelColor = "transparent";

  cellState: number;
  label: string | number = '-';

  private cellStateSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
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
      this.cellLabelSetter.setLabel(this);
    }
  }

  revertChanges() {
    this.currValue = this.prevValue;
    this.refreshLabel();
  }

  refreshLabel() {
    this.labelColor = "transparent";
    this.cellLabelSetter.setLabel(this);
    this.cd.markForCheck();
  }
}

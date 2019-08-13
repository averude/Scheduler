import {
  AfterViewInit, ContentChildren, Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { selectingLeft, selectingRight } from "../utils/table-selection-utils";
import { TableCellComponent } from "../../modules/admin/schedules/components/table-cell/table-cell.component";
import { CalendarDay } from "../../model/ui/calendar-day";

@Directive({
  selector: '[appSelectableRow]'
})
export class SelectableRowDirective implements OnInit, OnDestroy, AfterViewInit {

  @Input() mouseMove$:  Observable<number>;
  @Input() mouseUp$:    Observable<MouseEvent>;
  @Input() element:     ElementRef;

  @Output() onSelectionEnds: EventEmitter<any> = new EventEmitter();

  private mouseMoveSub: Subscription;
  private mouseDownSub: Subscription;
  private mouseUpSub:   Subscription;

  // Selection variables
  @ContentChildren(TableCellComponent)
  cells: QueryList<TableCellComponent>;
  dragging = false;
  startX: number;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
    this.mouseDownSub.unsubscribe();
    this.mouseUpSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.mouseDownSub = fromEvent<MouseEvent>(this.element.nativeElement, 'mousedown')
      .subscribe(event => {
        this.dragging = true;
        this.startX = event.clientX;

        this.mouseMoveSub = this.mouseMove$
          .pipe(filter(() => this.dragging))
          .subscribe(clientX => {
            this.clearSelection();
            if (this.startX > clientX) {
              selectingLeft(this.startX, clientX, this.cells);
            } else {
              selectingRight(this.startX, clientX, this.cells);
            }
          });
      });

    this.mouseUpSub = this.mouseUp$
      .subscribe(event => {
        if (this.dragging) {
          this.onSelectionEnds.emit({event: event, selectedDays: this.selectedDays});
          this.dragging = false;
          if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
        }
      });
  }

  get selectedDays(): CalendarDay[] {
    return this.cells
      .filter(item => item.selected)
      .map(value => value.day);
  }

  clearSelection() {
    this.cells
      .filter(item => item.selected)
      .forEach(selectedItem => selectedItem.deselect());
  }
}

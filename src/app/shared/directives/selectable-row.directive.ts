import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, filter, map, throttleTime } from "rxjs/operators";
import { selectingLeft, selectingRight } from "../utils/table-selection-utils";
import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";
import { CalendarDay } from "../../model/ui/calendar-day";

@Directive({
  selector: '[appSelectableRow]'
})
export class SelectableRowDirective implements OnInit, OnDestroy, AfterViewInit {

  static mouseMove$:  Observable<number>      = getMouseMove();
  static mouseUp$:    Observable<MouseEvent>  = getMouseUp();
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
    if (this.element) {
      this.mouseDownSub = fromEvent<MouseEvent>(this.element.nativeElement, 'mousedown')
        .subscribe(event => {
          this.dragging = true;
          this.startX = event.clientX;

          this.mouseMoveSub = SelectableRowDirective.mouseMove$
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

      this.mouseUpSub = SelectableRowDirective.mouseUp$
        .subscribe(event => {
          if (this.dragging) {
            this.onSelectionEnds.emit({event: event, selectedCells: this.selectedCells});
            this.dragging = false;
            if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
          }
        });
    }
  }

  get selectedDays(): CalendarDay[] {
    return this.cells
      .filter(item => item.selected)
      .map(value => value.day);
  }

  get selectedCells(): TableCellComponent[] {
    return this.cells
      .filter(item => item.selected);
  }

  clearSelection() {
    this.cells
      .filter(item => item.selected)
      .forEach(selectedItem => selectedItem.deselect());
  }
}

export const compFunction = (a, b) => a - b <= 3 && b - a <= 3;

export function getMouseMove() {
  return fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      map(event => event.clientX),
      distinctUntilChanged(compFunction)
    );
}

export function getMouseUp() {
  return fromEvent<MouseEvent>(document, 'mouseup');
}

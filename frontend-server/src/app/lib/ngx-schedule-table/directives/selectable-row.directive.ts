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
import { SelectableCellDirective } from "./selectable-cell.directive";
import { Cell } from "../model/data/cell";

@Directive({
  selector: '[selectableRow]'
})
export class SelectableRowDirective implements OnInit, OnDestroy, AfterViewInit {

  static mouseMove$:  Observable<number>      = getMouseMove();
  static mouseUp$:    Observable<MouseEvent>  = getMouseUp();

  @Input() disabled:  boolean;
  @Input() element:   ElementRef;
  @Input() value:     Cell;

  @Output() onSelectionEnds: EventEmitter<any> = new EventEmitter();

  private mouseMoveSub: Subscription;
  private mouseDownSub: Subscription;
  private mouseUpSub:   Subscription;

  @ContentChildren(SelectableCellDirective)
  cells: QueryList<SelectableCellDirective>;

  dragging = false;
  startX: number;

  private cellsSelected = false;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mouseMoveSub)  this.mouseMoveSub.unsubscribe();
    if (this.mouseDownSub)  this.mouseDownSub.unsubscribe();
    if (this.mouseUpSub)    this.mouseUpSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!this.disabled && this.element) {
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
          if (this.dragging && !this.cellsSelected) {
            this.onSelectionEnds.emit({event: event, selectedCells: this.selectedCells});
            this.dragging = false;
            this.cellsSelected = true;
            if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
          }
        });
    }
  }

  get selectedCells(): Cell[] {
    return this.cells
      .filter(item => item.selected)
      .map(item => item.data);
  }

  clearSelection() {
    if (this.cellsSelected) {
      this.cells
        .filter(item => item.selected)
        .forEach(selectedItem => selectedItem.deselect());
      this.cellsSelected = false;
    }
  }
}

export const compFunction = (a, b) => a - b <= 3 && b - a <= 3;

export function getMouseMove() {
  return fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      map(event => event.clientX),
      distinctUntilChanged((a, b) => a - b <= 3 && b - a <= 3)
    );
}

export function getMouseUp() {
  return fromEvent<MouseEvent>(document, 'mouseup');
}

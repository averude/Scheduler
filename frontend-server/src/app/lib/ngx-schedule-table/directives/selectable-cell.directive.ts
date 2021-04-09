import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { toggleClass } from "../utils/table-cell.utils";
import { Cell } from "../model/data/cell";
import { ClearSelectionService } from "../service/clear-selection.service";
import { Subscription } from "rxjs";

@Directive({
  selector: '[selectableCell]'
})
export class SelectableCellDirective implements OnInit, OnDestroy {
  @Input() data:              Cell;
  @Input() selectionEnabled:  boolean;
  @Input() multipleSelect:    boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  public selected: boolean = false;
  className = "selected";

  private clearSelectionSub: Subscription;

  constructor(public element: ElementRef,
              private clearSelectionService: ClearSelectionService) {}

  ngOnInit(): void {
    this.clearSelectionSub = this.clearSelectionService.onClearSelection()
      .subscribe(() => {
        if (!this.multipleSelect && this.selected) this.deselect();
      });
  }

  ngOnDestroy(): void {
    if (this.clearSelectionSub) this.clearSelectionSub.unsubscribe();
  }


  @HostListener('mousedown')
  mouseDown() {
    if (this.selectionEnabled && this.multipleSelect) {
      this.select();
    }
  }

  @HostListener('click', ['$event'])
  click(event) {
    if (!this.multipleSelect) {
      this.select();
      this.onClick.emit({event: event, selectedCells: [this.data]});
    }
  }

  select() {
    if (this.selectionEnabled && !this.selected) {
      this.selected = true;
      toggleClass(this.element, this.className);
    }
  }

  deselect() {
    if (this.selectionEnabled && this.selected) {
      this.selected = false;
      toggleClass(this.element, this.className);
    }
  }
}

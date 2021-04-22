import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { toggleClass } from "../utils/table-cell.utils";
import { Cell } from "../model/data/cell";
import { ClearSelectionService } from "../service/clear-selection.service";
import { Subscription } from "rxjs";
import { Options } from "../model/options";

@Directive({
  selector: '[selectableCell]'
})
export class SelectableCellDirective implements OnInit, OnDestroy {
  @Input() data:    Cell;
  @Input() options: Options;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  private selectionEnabled:  boolean;

  public selected: boolean = false;
  className = "selected";

  private clearSelectionSub: Subscription;

  constructor(public element: ElementRef,
              private clearSelectionService: ClearSelectionService) {}

  ngOnInit(): void {
    this.clearSelectionSub = this.clearSelectionService.onClearSelection()
      .subscribe(() => {
        if (!this.options?.multipleSelect && this.selected) this.deselect();
      });

    this.selectionEnabled = this.data.enabled && this.options?.selectionEnabled;
  }

  ngOnDestroy(): void {
    if (this.clearSelectionSub) this.clearSelectionSub.unsubscribe();
  }

  @HostListener('mousedown')
  mouseDown() {
    if (this.selectionEnabled && this.options?.multipleSelect) {
      this.select();
    }
  }

  @HostListener('click', ['$event'])
  click(event) {
    if (!this.options?.multipleSelect) {
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

import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { toggleClass } from "../utils/table-cell.utils";
import { CellData } from "../model/data/cell-data";

@Directive({
  selector: '[selectableCell]'
})
export class SelectableCellDirective {
  @Input() data: CellData;
  @Input() enabled: boolean = true;

  selected: boolean;
  className = "selected";

  constructor(public element: ElementRef) {}

  @HostListener('mousedown')
  mouseDown() {
    if (this.enabled) {
      this.select();
    }
  }

  select() {
    if (this.enabled && !this.selected) {
      this.selected = true;
      toggleClass(this.element, this.className);
    }
  }

  deselect() {
    if (this.enabled && this.selected) {
      this.selected = false;
      toggleClass(this.element, this.className);
    }
  }
}

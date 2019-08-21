import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CalendarDay } from "../../../../../model/ui/calendar-day";

@Component({
  selector: '[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})
export class TableCellComponent implements OnInit {

  @Input() value: any;
  @Input() day: CalendarDay;
  @Input() labelColor = "transparent";

  selected = false;
  className = "selected";

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('mousedown')
  mouseDown() {
    this.select();
  }

  select() {
    if (!this.selected) {
      this.selected = true;
      this.toggleClass();
    }
  }

  deselect() {
    if (this.selected) {
      this.selected = false;
      this.toggleClass();
    }
  }

  private toggleClass() {
    this.elementRef.nativeElement.classList.toggle(this.className);
  }
}

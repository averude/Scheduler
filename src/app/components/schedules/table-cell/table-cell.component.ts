import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Schedule} from '../../../model/schedule';

@Component({
  selector: '[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css'],
  exportAs: 'app-table-cell'
})
export class TableCellComponent implements OnInit {

  @Input() workDay: Schedule;
  @Input() day: Date;

  className = 'selected';

  @Input() dragging = false;
  selected = false;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  // Should be refactored
  getHours(): any {
    if (this.workDay !== undefined && this.workDay !== null) {
      if (this.workDay.label !== undefined && this.workDay.label !== null) {
        return this.workDay.label;
      } else {
        return this.workDay.hours;
      }
    } else {
      return 0;
    }
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.selected = !this.selected;
    this.toggleClass();
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.dragging) {
      this.selected = !this.selected;
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
    this.element.nativeElement.classList.toggle(this.className);
  }
}

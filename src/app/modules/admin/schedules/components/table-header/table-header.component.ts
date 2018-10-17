import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Input() daysInMonth: Date[];

  constructor() { }

  ngOnInit() {
  }

  isWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }

}

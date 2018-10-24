import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../../../../model/schedule';

@Component({
  selector: 'app-schedule-table-cell',
  templateUrl: './schedule-table-cell.component.html',
  styleUrls: ['./schedule-table-cell.component.css']
})
export class ScheduleTableCellComponent implements OnInit {

  @Input()
  date: Date;

  @Input()
  schedule: Schedule;

  constructor() { }

  ngOnInit() {
  }

}

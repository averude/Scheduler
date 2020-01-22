import { Component, Input, OnInit } from '@angular/core';
import { Shift } from "../../../../../../../model/shift";
import { Employee } from "../../../../../../../model/employee";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";


@Component({
  selector: '[app-statistics-shift-group]',
  templateUrl: './statistics-shift-group.component.html',
  styleUrls: ['./statistics-shift-group.component.css']
})
export class StatisticsShiftGroupComponent implements OnInit {

  @Input() shift: Shift;
  @Input() employees: Employee[];
  @Input() dayTypeGroups: DayTypeGroup[];

  constructor() { }

  ngOnInit() {
  }

}

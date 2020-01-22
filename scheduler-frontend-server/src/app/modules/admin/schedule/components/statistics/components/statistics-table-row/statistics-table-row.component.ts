import { Component, Input, OnInit } from '@angular/core';
import { Employee } from "../../../../../../../model/employee";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";

@Component({
  selector: '[app-statistics-table-row]',
  templateUrl: './statistics-table-row.component.html',
  styleUrls: ['./statistics-table-row.component.css']
})
export class StatisticsTableRowComponent implements OnInit {

  @Input() employee: Employee;
  @Input() dayTypeGroups: DayTypeGroup[] = [];

  constructor() { }

  ngOnInit() {
  }

}

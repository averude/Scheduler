import { Component, OnInit } from '@angular/core';
import { Employee } from "../../../../../../../model/employee";
import { EmployeeService } from "../../../../../../../services/employee.service";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { DayTypeGroupService } from "../../../../../../../services/day-type-group.service";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {

  employees:      Employee[]      = [];
  dayTypeGroups:  DayTypeGroup[]  = [];

  constructor(private employeeService: EmployeeService,
              private dayTypeGroupService: DayTypeGroupService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);

    this.dayTypeGroupService.getAll()
      .subscribe(groups => this.dayTypeGroups = groups);
  }

  calcDayTypeGroupSum(employee: Employee, dayTypeGroupId: number): number {
    return 0;
  }
}

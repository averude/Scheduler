import { Component, OnInit } from '@angular/core';
import { Employee } from "../../../../../model/employee";
import { EmployeeService } from "../../../../../services/employee.service";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { DayTypeGroupService } from "../../../../../services/day-type-group.service";
import { Shift } from "../../../../../model/shift";
import { ShiftService } from "../../../../../services/shift.service";
import * as moment from "moment";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {

  employees:      Employee[]      = [];
  dayTypeGroups:  DayTypeGroup[]  = [];
  shifts:         Shift[]         = [];
  months = moment.months();

  constructor(private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private dayTypeGroupService: DayTypeGroupService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);

    this.dayTypeGroupService.getAll()
      .subscribe(groups => this.dayTypeGroups = groups);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  getEmployeesOfShift(shiftId: number): Employee[] {
    return this.employees.filter(employee => employee.shiftId === shiftId);
  }
}

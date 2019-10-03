import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Employee } from "../../../../../../../model/employee";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { Shift } from "../../../../../../../model/shift";
import { EmployeeService } from "../../../../../../../services/employee.service";
import { ShiftService } from "../../../../../../../services/shift.service";
import { DayTypeGroupService } from "../../../../../../../services/day-type-group.service";

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

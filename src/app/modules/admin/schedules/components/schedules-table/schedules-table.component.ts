import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';


@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  currentDate: Date;
  daysInMonth: Date[] = [];
  year: number;
  month: number;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(1)
      .subscribe(value => this.employees = value);
    this.currentDate = new Date();
    this.year = this.currentDate.getFullYear();
    this.month = this.currentDate.getMonth();
    this.calculateDaysInMonth();
  }

  nextMonth() {
    if (this.month === 11) {
      this.currentDate.setUTCFullYear(++this.year);
      this.month = 0;
    } else {
      this.month += 1;
    }
    this.currentDate.setUTCMonth(this.month);
    this.calculateDaysInMonth();
  }

  prevMonth() {
    if (this.month === 0) {
      this.currentDate.setUTCFullYear(--this.year);
      this.month = 11;
    } else {
      this.month--;
    }
    this.currentDate.setUTCMonth(this.month);
    this.calculateDaysInMonth();
  }

  calculateDaysInMonth() {
    this.daysInMonth.length = 0;
    const daysNum = new Date(this.year, this.month + 1, 0).getDate();
    for (let i = 0; i < daysNum; i++) {
      // this.daysInMonth[i] = new Date(this.year, this.month, i + 1);
      this.daysInMonth[i] = new Date(Date.UTC(this.year, this.month, i + 1));
    }
  }
}

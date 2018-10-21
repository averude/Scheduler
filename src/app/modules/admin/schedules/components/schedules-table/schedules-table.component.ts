import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { PaginatorService } from '../../paginator.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  daysInMonth: Date[] = [];
  employees: Employee[];

  constructor(private employeeService: EmployeeService,
              private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(1)
      .subscribe(value => this.employees = value);
    this.sub = this.paginatorService.dates
      .pipe(distinctUntilChanged())
      .subscribe(daysInMonth => this.daysInMonth = daysInMonth);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../../../../../../../services/http/employee.service";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { NotificationsService } from "angular2-notifications";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../../../../../model/main-shift-composition";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { SubstitutionShiftCompositionService } from "../../../../../../../services/http/substitution-shift-composition.service";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { MainShiftCompositionService } from "../../../../../../../services/http/main-shift-composition.service";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { SubstitutionShiftCompositionDialogComponent } from "../substitution-shift-composition-dialog/substitution-shift-composition-dialog.component";

@Component({
  selector: 'app-substitution-shift-composition-table',
  templateUrl: './substitution-shift-composition-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './substitution-shift-composition-table.component.css'],
  providers: [PaginationService]
})
export class SubstitutionShiftCompositionTableComponent extends PageableTableBaseComponent<SubstitutionShiftComposition> {
  displayedColumns = ['select', 'shift', 'employee', 'date_range', 'control'];

  employees:  Employee[]  = [];
  shifts:     Shift[]     = [];
  mainCompositions: MainShiftComposition[] = [];

  private subscription: Subscription;

  constructor(datePaginationService: PaginationService,
              dialog: MatDialog,
              private mainShiftCompositionService: MainShiftCompositionService,
              substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              notificationsService: NotificationsService) {
    super(datePaginationService, dialog, substitutionShiftCompositionService, notificationsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);
    this.subscription = this.datePaginationService.onValueChange
      .pipe(switchMap(value => {
          return this.mainShiftCompositionService
            .getAll(value.from, value.to);
        })
      ).subscribe(values => this.mainCompositions = values);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  openDialog(substitutionShiftComposition: SubstitutionShiftComposition) {
    const data = {
      shiftSchedule: substitutionShiftComposition,
      shifts: this.shifts,
      employees: this.employees,
      mainCompositions: this.mainCompositions
    };

    this.openAddOrEditDialog(substitutionShiftComposition, data, SubstitutionShiftCompositionDialogComponent);
  }

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }

  getShift(shiftId: number): Shift {
    return this.shifts.find(value => value.id === shiftId);
  }
}

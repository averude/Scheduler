import { HasDepartmentTableComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { Shift } from "../../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../services/http/shift.service";
import { Component } from "@angular/core";
import { ShiftUserAccountService } from "../../../../../services/http/auth/shift-user-account.service";
import { UserAccountDTO } from "../../../../../model/dto/user-account-dto";
import { AddShiftUserAccountDialogComponent } from "../add-shift-user-account-dialog/add-shift-user-account-dialog.component";
import { EditShiftUserAccountDialogComponent } from "../edit-shift-user-account-dialog/edit-shift-user-account-dialog.component";
import { ResetUserAccountPasswordDialogComponent } from "../../../../reset-user-account-password-dialog/reset-user-account-password-dialog.component";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../../services/http/auth.service";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css',
    './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends HasDepartmentTableComponent<UserAccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'shifts', 'role', 'resetPass', 'control'];

  shifts: Shift[] = [];
  shiftMap: Map<number, Shift>;

  private readonly enterpriseId;

  constructor(private authService: AuthService,
              dialog: MatDialog,
              shiftUserAccountService: ShiftUserAccountService,
              notificationsService: NotificationsService,
              private shiftService: ShiftService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      shiftUserAccountService, notificationsService);

    this.enterpriseId = authService.currentUserAccount.enterpriseId;

    this.shiftService.getAllByDepartmentId(this.departmentId)
      .subscribe(shifts => {
        this.shiftMap = new Map<number, Shift>();
        shifts.forEach(shift => this.shiftMap.set(shift.id, shift));
        this.shifts = shifts;
      });
  }

  openDialog(t: UserAccountDTO) {
  }

  openAddDialog() {
    const data = {
      shifts: this.shifts,
      enterpriseId: this.enterpriseId,
      departmentId: this.departmentId
    };

    this.openAddOrEditDialog(null, data, AddShiftUserAccountDialogComponent);
  }

  openEditDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
      shifts: this.shifts,
      enterpriseId: this.enterpriseId,
      departmentId: this.departmentId
    };

    this.openAddOrEditDialog(userAccountDTO, data, EditShiftUserAccountDialogComponent);
  }

  openResetPassDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
    };

    this.matDialog.open(ResetUserAccountPasswordDialogComponent, {data: data})
      .afterClosed()
      .subscribe(passwordResetDTO => {
        if (passwordResetDTO) {
          const crudService = <ShiftUserAccountService> this.crudService;
          crudService.resetPassword(userAccountDTO.id, passwordResetDTO)
            .subscribe(res => this.notification
              .success(`Password of ${userAccountDTO.username} successfully reset`));
        }
      })
  }

  getShiftsName(shiftIds: number[]): string {
    if (shiftIds && shiftIds.length > 0) {
      return shiftIds.sort()
        .map((shiftId, index) => {
          const shift = this.shiftMap.get(shiftId);
          if (shift) {
            return `${shift.name}${index < shiftIds.length - 1 ? ', ' : ''}`
          }
        })
        .reduce(((previousValue, currentValue) => previousValue?.concat(currentValue)));
    }
  }
}

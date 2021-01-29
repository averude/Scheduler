import { TableBaseIdEntityComponent } from "../../../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { Shift } from "../../../../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Component } from "@angular/core";
import { binarySearch } from "../../../../../../../shared/utils/collection-utils";
import { ShiftUserAccountService } from "../../../../../../../services/http/auth/shift-user-account.service";
import { UserAccountDTO } from "../../../../../../../model/dto/new-user-account-dto";
import { AddShiftUserAccountDialogComponent } from "../add-shift-user-account-dialog/add-shift-user-account-dialog.component";
import { EditShiftUserAccountDialogComponent } from "../edit-shift-user-account-dialog/edit-shift-user-account-dialog.component";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseIdEntityComponent<UserAccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'shifts', 'role', 'control'];

  shifts: Shift[] = [];

  constructor(dialog: MatDialog,
              shiftUserAccountService: ShiftUserAccountService,
              notificationsService: NotificationsService,
              private shiftService: ShiftService) {
    super(dialog, shiftUserAccountService, notificationsService);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(t: UserAccountDTO) {
  }

  openAddDialog() {
    const data = {
      shifts: this.shifts
    };

    this.openAddOrEditDialog(null, data, AddShiftUserAccountDialogComponent);
  }

  openEditDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
      shifts: this.shifts
    };

    this.openAddOrEditDialog(userAccountDTO, data, EditShiftUserAccountDialogComponent);
  }

  onUpdated(value: UserAccountDTO, oldValue: UserAccountDTO): (value: any) => void {
    return res => {
      this.updateRow(res, oldValue);
      this.notification
        .success(
          'Updated',
          `User account was successfully updated`);
    }
  }

  onCreated(value: UserAccountDTO): (value: any) => void {
    return res => {
      value = res;
      this.addRow(value);
      this.notification
        .success(
          'Created',
          `User account was successfully created`)
    }
  }

  getShiftsName(shiftIds: number[]): string {
    if (shiftIds && shiftIds.length > 0) {
      return shiftIds.sort()
        .map((shiftId, index) => {
          const shift = binarySearch(this.shifts, mid => mid.id - shiftId);
          if (shift) {
            return `${shift.name}${index < shiftIds.length - 1 ? ', ' : ''}`
          }
        })
        .reduce(((previousValue, currentValue) => previousValue.concat(currentValue)));
    }
  }
}

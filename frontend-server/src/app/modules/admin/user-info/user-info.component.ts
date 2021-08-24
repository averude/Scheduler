import { Component, Input, OnInit } from '@angular/core';
import { ChangeUserAccountPasswordDialogComponent } from "../../../components/user-account-password/change-user-account-password-dialog/change-user-account-password-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserAccountService } from "../../../services/http/user-account.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() name:  string;
  @Input() org:   string;

  constructor(private dialog: MatDialog,
              private userAccountService: UserAccountService,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangeUserAccountPasswordDialogComponent)
      .afterClosed()
      .subscribe(passwordChangeDTO => {
        if (passwordChangeDTO) {
          this.userAccountService.changePassword(passwordChangeDTO)
            .subscribe(res => this.notificationsService.success("Password changed"));
        }
      });
  }

}

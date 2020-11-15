import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../../services/http/auth.service";
import { UserAccessRights } from "../../../../../model/user";

@Component({
  selector: 'app-schedule-tab-bar',
  templateUrl: './schedule-tab-bar.component.html',
  styleUrls: ['./schedule-tab-bar.component.css',
    '../../../../../shared/common/toolbar.common.css']
})
export class ScheduleTabBarComponent implements OnInit {
  userAccessRights: UserAccessRights;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userAccessRights = this.authService.currentUserValue.accessRights;
  }

}

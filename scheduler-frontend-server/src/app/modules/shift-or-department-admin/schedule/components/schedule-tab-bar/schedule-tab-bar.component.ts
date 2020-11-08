import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../../services/http/auth.service";

@Component({
  selector: 'app-schedule-tab-bar',
  templateUrl: './schedule-tab-bar.component.html',
  styleUrls: ['./schedule-tab-bar.component.css',
    '../../../../../shared/common/toolbar.common.css']
})
export class ScheduleTabBarComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

}

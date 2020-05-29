import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../http-services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css',
    '../../../shared/common/toolbar.common.css']
})
export class TopbarComponent implements OnInit {

  roles: string[];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}

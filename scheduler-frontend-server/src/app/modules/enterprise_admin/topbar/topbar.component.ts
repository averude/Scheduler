import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../http-services/auth.service";
import { EnterpriseService } from "../../../http-services/enterprise.service";
import { Enterprise } from "../../../model/enterprise";

@Component({
  selector: 'app-admin',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css',
    '../../../shared/common/toolbar.common.css']
})
export class TopbarComponent implements OnInit {

  roles: string[];

  enterprise: Enterprise;

  constructor(
    private authService: AuthService,
    private enterpriseService: EnterpriseService
  ) {}

  ngOnInit(): void {
    this.enterpriseService.getCurrent()
      .subscribe(enterprise => this.enterprise = enterprise);
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/http/auth.service";
import { EnterpriseService } from "../../../services/http/enterprise.service";
import { Enterprise } from "../../../model/enterprise";

@Component({
  selector: 'app-enterprise-admin',
  templateUrl: './enterprise-admin.component.html',
  styleUrls: ['./enterprise-admin.component.css']
})
export class EnterpriseAdminComponent implements OnInit {

  roles: string[];

  enterprise: Enterprise;

  constructor(private authService: AuthService,
              private enterpriseService: EnterpriseService) {}

  ngOnInit(): void {
    this.enterpriseService.getCurrent()
      .subscribe(enterprise => this.enterprise = enterprise);
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}

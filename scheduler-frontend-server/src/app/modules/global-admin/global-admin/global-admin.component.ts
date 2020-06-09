import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../http-services/auth.service";

@Component({
  selector: 'app-global-admin',
  templateUrl: './global-admin.component.html',
  styleUrls: ['./global-admin.component.css']
})
export class GlobalAdminComponent implements OnInit {

  roles: string[];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}

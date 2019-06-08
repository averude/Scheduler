import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  // Should be reworked
  login() {
    this.authService.login(this.username, this.password)
      .subscribe(res => this.navigate(res));
  }

  private navigate(user: any) {
    if (user.roles.indexOf('DEPARTMENT_ADMIN') >= 0) {
      this.router.navigate(['/admin/schedule']);
    }
    if (user.roles.indexOf('ROLE_CLIENT') >= 0) {
      this.router.navigate(['/client']);
    }
  }
}

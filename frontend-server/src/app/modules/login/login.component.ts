import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/http/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAccountDTO, UserAccountLevel } from "../../model/dto/user-account-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  loading = false;
  error = false;
  bad_credentials = false;
  server_error = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();

    this.loginForm = this.fb.group({
      username: [null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(64)]
      ],
      password: [null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(64)]
      ],
    });
  }

  private get form() { return this.loginForm.controls }

  isControlInvalid(controlName: string): boolean {
    let control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  getErrorMessage(controlName: string): string {
    let control = this.loginForm.controls[controlName];

    return '';
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.authService.login(
      this.form.username.value.trim().toLowerCase(),
      this.form.password.value.trim()
    ).subscribe(res => {
        this.navigate(res).catch(() => this.loading = false);
      }, err => {
        this.loading = false;
        this.error = true;
        if (err.status >= 400 && err.status < 500) {
          this.bad_credentials = true;
        } else {
          this.server_error = true;
        }
        this.loginForm.patchValue({password: null})
      });
  }

  private navigate(user: UserAccountDTO): Promise<boolean> {
    let promise;
    switch (user.level) {

      case UserAccountLevel.GLOBAL:
        promise = this.router.navigate(['/global_admin']);
        break;

      case UserAccountLevel.ENTERPRISE:
        promise = this.router.navigate(['/admin']);
        break;

      case UserAccountLevel.DEPARTMENT:
        if (user.departmentIds.length > 1) {
          promise = this.router.navigate(['/admin']);
        } else {
          promise = this.router.navigate([`/admin/department/${user.departmentIds[0]}/calendar`]);
        }
        break;

      case UserAccountLevel.SHIFT:
        promise = this.router.navigate([`/admin/department/${user.departmentIds[0]}/calendar`]);
        break;

      default:
        throw new Error("Wrong level of user account");
    }
    return promise;
  }
}

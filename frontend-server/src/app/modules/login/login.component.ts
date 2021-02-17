import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/http/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAccountAuthority, UserAccountDTO } from "../../model/dto/new-user-account-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  loading = false;
  bad_credentials = false;

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
        this.bad_credentials = true;
        this.loginForm.patchValue({password: null})
      });
  }

  private navigate(user: UserAccountDTO): Promise<boolean> {
    let promise;
    switch (user.authority) {

      case UserAccountAuthority.GLOBAL_ADMIN:
        promise = this.router.navigate(['/global_admin']);
        break;

      case UserAccountAuthority.ENTERPRISE_ADMIN:
        promise = this.router.navigate(['/enterprise_admin']);
        break;

      case UserAccountAuthority.DEPARTMENT_ADMIN:
        promise = this.router.navigate(['/shift_or_department_admin/schedule/calendar']);
        break;

      case UserAccountAuthority.SHIFT_ADMIN:
        promise = this.router.navigate(['/shift_or_department_admin/schedule/calendar']);
        break;

      default:
        throw new Error("Wrong authority of user account");
    }
    return promise;
  }
}

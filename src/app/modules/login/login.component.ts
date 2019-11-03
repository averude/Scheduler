import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  loading = false;
  bad_credentials=false;

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

    this.loading = true;
    this.authService.login(this.form.username.value, this.form.password.value)
      .subscribe(res => {
        this.loading = false;
        this.navigate(res);
      }, err => {
        this.loading = false;
        this.bad_credentials = true;
        this.loginForm.reset();
      });
  }

  private navigate(user: any) {
    if (user.roles.indexOf('GLOBAL_ADMIN') >= 0) {
      this.router.navigate(['/global_admin']);
    }
    if (user.roles.indexOf('DEPARTMENT_ADMIN') >= 0) {
      this.router.navigate(['/admin/schedule/calendar']);
    }
    if (user.roles.indexOf('SHIFT_ADMIN') >= 0 ) {
      this.router.navigate(['/admin/schedule/calendar']);
    }
    if (user.roles.indexOf('ROLE_CLIENT') >= 0) {
      this.router.navigate(['/client']);
    }
  }
}

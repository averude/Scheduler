import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/http/auth.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([401,403].indexOf(err.status) !== -1) {
        window.alert(err.status);
        this.authService.logout();
        location.reload();
      }

      // if (err.error) {
      //   const error = err.error.errorMessage || err.statusText;
      //   return throwError(error);
      // }
      return throwError(err);
    }));
  }
}

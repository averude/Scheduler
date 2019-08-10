import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { catchError } from "rxjs/operators";
import { ErrorDetails } from "../model/dto/error-details";

const OPTIONS = {
  timeOut: 5000,
  showProgressBar: true,
  preventDuplicates: true
};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorDetails) {
          err.error.errors.forEach(error => this.notificationsService
            .error(error.message, error.details, OPTIONS));
        } else {
          if (err.status) {
            this.notificationsService
              .error(`Backend error. Code: ${err.status} `, `${err.message}`, OPTIONS);
          } else {
            this.notificationsService
              .error('Backend error', `Server is not responding`, OPTIONS);
          }
        }
        return throwError(err);
      }));
  }
}

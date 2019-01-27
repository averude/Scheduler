import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.notificationsService.error('An error occurred', err.error.message);
        } else {
          if (err.status) {
            this.notificationsService.error('Backend error', `Status code: ${err.status}`);
          } else {
            this.notificationsService.error('Backend error', `Server is not responding`);
          }
        }
        return throwError(err);
      }));
  }
}

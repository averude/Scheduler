import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-type')) {
      req = req.clone({
        headers: req.headers
          .set('Content-Type','application/json;charset=UTF-8')
          .set('Department-ID',this.departmentId)
      });
    }
    return next.handle(req);
  }

  private get departmentId(): string {
    const user = this.authService.currentUserValue;
    if (user && user.departmentId) {
      return user.departmentId.toString();
    }
    return 'none';
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { timeout } from "rxjs/operators";

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf("/api/v1/schedule/generate") < 0) {
      return next.handle(req).pipe(timeout(5000));
    } else {
      return next.handle(req);
    }
  }
}

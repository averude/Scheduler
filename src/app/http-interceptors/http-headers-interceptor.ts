import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-type') && !req.url.includes('/admin/icons/upload')) {
      req = req.clone({
        headers: req.headers
          .set('Content-Type','application/json;charset=UTF-8')
      });
    }
    if (req.url.includes('/file')) {
      req = req.clone({
        headers: req.headers
          .set('Accept','image/jpg')
      });
    }
    return next.handle(req);
  }
}

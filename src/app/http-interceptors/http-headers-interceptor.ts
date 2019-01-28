import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestConfig } from "../rest.config";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(private restConfig: RestConfig) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({headers: this.restConfig.headers}));
  }
}

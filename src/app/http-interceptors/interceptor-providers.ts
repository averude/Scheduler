import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./http-error-interceptor";
import { TimeoutInterceptor } from "./timeout-interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true}
];

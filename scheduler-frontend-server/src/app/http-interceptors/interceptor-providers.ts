import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./http-error-interceptor";
import { TimeoutInterceptor } from "./timeout-interceptor";
import { HttpHeadersInterceptor } from "./http-headers-interceptor";
import { AuthInterceptor } from "./auth-interceptor";
import { AuthErrorInterceptor } from "./auth-error-interceptor";
import { HttpCacheInterceptor } from "./http-cache-interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true}
];

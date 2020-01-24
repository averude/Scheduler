import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { CacheMapService } from "../http-services/cache-map.service";
import { tap } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

const CACHABLE_URL = "/api/v1/";

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor{

  constructor(private cache: CacheMapService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRequestCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    if (cachedResponse !== null) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      })
    );
  }

  private isRequestCachable(req: HttpRequest<any>) {
    return (req.method === 'GET') && (req.url.indexOf(CACHABLE_URL) > -1);
  }
}

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../../model/user";
import decode from "jwt-decode";
import { RestConfig } from "../../rest.config";
import { CacheMapService } from "../cache/cache-map.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cache: CacheMapService,
              private router: Router,
              private config: RestConfig,
              private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/uaa/oauth/token`,
      `username=${username}&password=${password}&grant_type=password&client_id=browser`,
      this.getOptions()
    ).pipe(
        shareReplay(),
        map(token => {
          if (token && token.access_token) {
            const user = new User();
            const token_claims = decode(token.access_token);
            user.roles = token_claims.authorities;
            user.access_token = token.access_token;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return user;
          }
          return token;
        })
    );
  }

  public get currentUserValue(): User {
    let user = sessionStorage.getItem('currentUser');
    return JSON.parse(user);
  }

  public isLogon(): boolean {
    return !!(this.currentUserValue && this.currentUserValue.access_token);
  }

  public logout() {
    this.cache.clear();
    sessionStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

  private getOptions() {
    const headers = new HttpHeaders()
      .append('Content-type','application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Basic '+btoa("browser:secret"));
    return { headers: headers };
  }
}

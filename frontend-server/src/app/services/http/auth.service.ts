import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { shareReplay, switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserAccessRights, UserSession } from "../../model/user";
import decode from "jwt-decode";
import { RestConfig } from "../../rest.config";
import { CacheMapService } from "../cache/cache-map.service";
import { UserAccountService } from "./user-account.service";
import { UserAccountDTO } from "../../model/dto/user-account-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cache: CacheMapService,
              private router: Router,
              private config: RestConfig,
              private userService: UserAccountService,
              private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/uaa/oauth/token`,
      `username=${username}&password=${password}&grant_type=password&client_id=browser`,
      this.getOptions()
    ).pipe(
        shareReplay(),
        switchMap(token => {
          if (token && token.access_token) {
            const userSession = new UserSession();
            const token_claims = decode(token.access_token);
            userSession.roles = token_claims.authorities;
            userSession.access_token = token.access_token;
            userSession.expired = token_claims.exp;
            this.fillAccessRights(userSession);
            sessionStorage.setItem('currentUser', JSON.stringify(userSession));

            return this.userService.me().pipe(tap(userAccount =>
              sessionStorage.setItem('userAccount', JSON.stringify(userAccount))));
          }
        })
    );
  }

  public get currentUserValue(): UserSession {
    let user = sessionStorage.getItem('currentUser');
    return JSON.parse(user);
  }

  public get currentUserAccount(): UserAccountDTO {
    let account = sessionStorage.getItem('userAccount');
    return JSON.parse(account);
  }

  public isLogon(): boolean {
    return !!(this.currentUserValue && this.currentUserValue.access_token);
  }

  public isAdmin(): boolean {
    return this.currentUserValue.accessRights.isAdmin;
  }

  public logout() {
    this.cache.clear();
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("userAccount");
    this.router.navigate(['/login']);
  }

  private getOptions() {
    const headers = new HttpHeaders()
      .append('Content-type','application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Basic '+btoa("browser:secret"));
    return { headers: headers };
  }

  private fillAccessRights(user: UserSession) {
    user.accessRights = new UserAccessRights();
    user.roles.forEach(role => {
      switch (role) {
        case 'ROLE_ADMIN': {
          user.accessRights.isAdmin = true;
          break;
        }
        case 'ENTERPRISE_ADMIN': {
          user.accessRights.isEnterpriseLevel = true;
          break;
        }
        case 'DEPARTMENT_ADMIN': {
          user.accessRights.isDepartmentLevel = true;
          break;
        }
        case 'SHIFT_ADMIN': {
          user.accessRights.isShiftLevel = true;
          break;
        }
        default: break;
      }
    });
  }
}

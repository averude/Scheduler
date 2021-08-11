import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/http/auth.service";
import { Observable } from "rxjs";
import { UserAccountLevel, UserAccountRole } from "../model/dto/user-account-dto";

@Injectable({
  providedIn: 'root'
})
export class SecurityGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userAccount = this.authService.currentUserAccount;

    const authorities: UserAccountLevel[] = route.data.authorities;
    const roles: UserAccountRole[]            = route.data.roles;

    if (userAccount) {

      if (authorities.indexOf(userAccount.level) >= 0 &&
          roles.indexOf(userAccount.role) >= 0) {
        return true;
      }

    }

    this.router.navigate(['login']);
    return false;
  }

}

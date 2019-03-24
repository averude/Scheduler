import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (next.data.roles && !this.checkRoles(next.data.roles, currentUser.roles)) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    return false;
  }

  private checkRoles(expectedRoles: string[], userRoles: string[]): boolean {
    return expectedRoles.some(role => userRoles.indexOf(role) >= 0);
  }
}

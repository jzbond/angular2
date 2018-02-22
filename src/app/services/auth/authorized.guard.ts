import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([ '/login' ]);
    }
    return true;
  }
}

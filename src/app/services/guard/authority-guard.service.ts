import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const requiredAuthority = route.data['authority'] as string;

    if (this.authService.isAuthenticated() && this.authService.hasAuthority(requiredAuthority)) {
      return true;
    }

    console.log('==> /access-denied')
    this.router.navigate(['/access-denied']);
    return false;
  }
}

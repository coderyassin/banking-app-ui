import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const oauthLoginUrl = `${environment.oauth_url}/login`;
      window.location.href = `${oauthLoginUrl}?redirect_uri=${encodeURIComponent(window.location.origin)}`;
      return false;
    }
  }
}

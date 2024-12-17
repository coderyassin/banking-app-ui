import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {AuthorityGuardService} from './services/guard/authority-guard.service';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'access-denied',
    component: UnauthorizedComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService, AuthorityGuardService],
    data: { authority: 'READ_PRIVILEGE' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './services/guard/auth-guard.service';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

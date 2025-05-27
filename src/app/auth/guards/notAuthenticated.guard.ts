import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const notAuthenticated: CanMatchFn = async (route, segments) => {

const authService = inject(AuthService);
const router = inject(Router);

const isAuthenticated = await firstValueFrom(authService.checkStatus());

if (isAuthenticated) {
  router.navigateByUrl('dashboard');
  return false;
}

  return true;
};

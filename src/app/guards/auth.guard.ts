import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = await authService.authStateAsync;

  if (!isLoggedIn) {
    await router.navigate(['/']);
    return true;
  }

  return false;
};

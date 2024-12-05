import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  const isLoggedIn = loginService.token$.getValue();
  if (!isLoggedIn) {
    toastService.error("You can't access this page");
    return router.createUrlTree(['/']);
  }
  return true;
};

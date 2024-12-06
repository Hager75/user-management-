import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { ToastService } from '../services/toast.service';

export const loginGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  const isLoggedIn = loginService.token$.getValue();
  
  if (isLoggedIn) {
    toastService.error("You are already logged in");
    return router.navigate(['/user-list']);
  }
  return true;
};

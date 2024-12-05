import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { LoginService } from '../../core/services/login.service';
import { userFormData } from '../../core/models/user.model';
import { finalize, tap } from 'rxjs';
import { TOKEN_STORAGE_KEY } from '../../core/enums/shared.enum';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  isLoading = signal(false);
  loginService = inject(LoginService);
  toastService = inject(ToastService);
  router = inject(Router);

  onSaveUserData(userData: userFormData): void {    
    this.isLoading.set(true);
    this.loginService.login(userData).pipe(tap((result) => {      
      if (result.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY.TOKEN, result.token);
        this.loginService.token$.next(result.token);
        this.toastService.success('Logged in successful');
        this.router.navigate(['/user-list']);
      }
    }
    ), finalize(() => {
      this.isLoading.set(false);
  
    })).subscribe();
  }
 }

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoginComponent } from './login/login.component';

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

 }

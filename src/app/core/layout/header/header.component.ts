import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  loginService = inject(LoginService);
  onClick():void {
    if(this.loginService.token$.getValue()){
      this.loginService.logout();
    }
  }
 }

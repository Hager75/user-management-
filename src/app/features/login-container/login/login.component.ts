import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { userFormData } from '../../../core/models/user.model';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,InputComponent,ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isLoading = input(false);
  saveUserData = output<userFormData>();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string>("",
      Validators.required),
  });
  
  onsubmit(form: FormGroup) {    
    if (form.valid) {
      const userData: userFormData = {
        email: form.get("email")?.value ?? '',
        password: form.get("password")?.value ?? ''
      }
      this.saveUserData.emit(userData);
    }
  }
 }

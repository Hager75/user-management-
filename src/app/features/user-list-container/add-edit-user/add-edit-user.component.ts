import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [InputComponent,ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditUserComponent {
  form = input.required<FormGroup>();
 }

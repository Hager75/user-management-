import { ChangeDetectionStrategy, Component, computed, input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  fieldType = input.required<'password' | 'email' | 'text'>();
  title = input.required<string>();
  id = input.required<string>();
  control = input.required<string>();
  form = input.required<FormGroup>();
  fieldPlaceholder = input<string>();
  validationMsg = input<string>();
  errors = signal<ValidationErrors | null | undefined>(null);

  errorMsg = computed(() => {
    if (this.errors()?.['required']) {
      return `${this.title()} is required.`;
    } else if (this.errors()?.['email']) {
      return 'Invaild Email';
    } else if (this.errors()?.['pattern']) {
      return `Invaild ${this.title()}.`;
    } else {
      return;
    }
  });

  ngOnInit(): void {
    this.form()
      ?.get(this.control())
      ?.statusChanges.subscribe((status) => {
        if (status === 'INVALID') {
          this.errors.set(this.form()?.get(this.control())?.errors);
        }
      });
  }
 }

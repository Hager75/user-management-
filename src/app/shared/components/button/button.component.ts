import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  text = input.required();
  icon = input('');
  showLoader = input(false);
  disabled = input(false);
  extraClass = input('btn-main-primary');
  btnClicked = output<void>();
  onClick(): void {
    this.btnClicked.emit();
  }
}

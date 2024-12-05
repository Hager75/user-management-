import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent {
  user = input(null);
 }

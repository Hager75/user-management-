import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [],
  templateUrl: './user-list-container.component.html',
  styleUrl: './user-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UserListHeaderComponent } from './user-list-header/user-list-header.component';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [UserListComponent,UserListHeaderComponent],
  templateUrl: './user-list-container.component.html',
  styleUrl: './user-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent { }

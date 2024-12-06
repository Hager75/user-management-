import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,

} from '@angular/core';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

import { UserInfo } from '../../../core/models/user.model';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserItemComponent,
    NgbOffcanvasModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  users = input.required<UserInfo[]>();
  selectedUser = input<UserInfo | null>(null);
  handleUserClick = output<number>();
  handleEditClick = output<number>();
  handleDeleteUser = output<number | undefined>();
  handleAddClick = output<number>();

  userClicked(id: number): void {
    this.handleUserClick.emit(id);
  }


}

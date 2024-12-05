import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

import { UserInfo } from '../../../core/models/user.model';
import { UserItemComponent } from '../user-item/user-item.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent, NgbOffcanvasModule, ButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private offcanvasService = inject(NgbOffcanvas);
  users = input.required<UserInfo[]>();
  isShowLoader = input(false);
  showUserModal = signal(false);
  showDeleteUserModal = signal(false);
  selectedUser = input<UserInfo | null>(null);
  handleUserClick = output<number>();
  contentTemplate = viewChild('content');

  userClicked(id: number): void {
    this.openNoBackdrop();
    this.handleUserClick.emit(id);
  }

  openNoBackdrop() {
    this.offcanvasService.open(this.contentTemplate(), {
      backdrop: false,
      position: 'end',
    });
  }
  editUser(): void {
    this.showUserModal.set(true);
    this.offcanvasService.dismiss();
  }
  deleteUser(): void {
    this.showDeleteUserModal.set(true);
    this.offcanvasService.dismiss();

  }
}

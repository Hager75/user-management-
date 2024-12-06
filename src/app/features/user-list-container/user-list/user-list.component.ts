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
import { GeneralModalComponent } from '../../../shared/components/general-modal/general-modal.component';
import { ModalType } from '../../../core/enums/shared.enum';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserItemComponent,
    NgbOffcanvasModule,
    ButtonComponent,
    GeneralModalComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private offcanvasService = inject(NgbOffcanvas);
  users = input.required<UserInfo[]>();
  isShowLoader = input(false);
  showUserModal = signal(false);
  selectedUser = input<UserInfo | null>(null);
  handleUserClick = output<number>();
  handleEditClick = output<number>();
  handleDeleteUser = output<number | undefined>();
  handleAddClick = output<number>();
  contentTemplate = viewChild('content');
  modalInfo = signal({
    type: ModalType.DELETE,
    confirmBtnTxt: 'Yes',
    cancelBtnTxt: 'Cancel',
  });
  modalType = ModalType;
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
  }
  deleteUser(): void {
    this.showUserModal.set(true);
    this.modalInfo.set({
      type: ModalType.DELETE,
      confirmBtnTxt: 'Yes',
      cancelBtnTxt: 'Cancel',
    });
  }

  closeUserModal(): void {
    this.showUserModal.set(false);
    this.offcanvasService.dismiss();
  }

  handleConfirm():void {
    if(this.modalInfo().type === this.modalType.DELETE){
      this.handleDeleteUser.emit(this.selectedUser()?.id);
    }
    this.offcanvasService.dismiss();

  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UserListHeaderComponent } from './user-list-header/user-list-header.component';
import { UsersService } from '../../core/services/users.service';
import { UserInfo } from '../../core/models/user.model';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { ModalType } from '../../core/enums/shared.enum';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GeneralModalComponent } from '../../shared/components/general-modal/general-modal.component';
import { SideModalComponent } from '../../shared/components/side-modal/side-modal.component';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [UserListComponent, UserListHeaderComponent,GeneralModalComponent, SideModalComponent
  ],
  templateUrl: './user-list-container.component.html',
  styleUrl: './user-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);
  private usersService = inject(UsersService);
  isLoading = signal(false);
  isOpenSideModal = signal(false);
  isShowUserInfoLoading = signal(false);
  userList = signal<UserInfo[]>([]);
  selectedUser = signal<UserInfo | null>(null);
  toastService = inject(ToastService);
  currentPage = 1;
  modalInfo = signal({
    type: ModalType.DELETE,
    confirmBtnTxt: 'Yes',
    cancelBtnTxt: 'Cancel',
  });
  showUserModal = signal(false);
  modalType = ModalType;

  ngOnInit(): void {
    this.isLoading.set(true);
    this.usersService
      .getUserList({ page: this.currentPage })
      .pipe(
        tap(({ data }) => {
          this.userList.set(data);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }


  handleUserClick(id: number): void {
    this.isShowUserInfoLoading.set(true);
    this.isOpenSideModal.set(true);
    this.usersService
      .getUserInfo(id)
      .pipe(
        tap(({ data }) => {
          this.selectedUser.set(data);
        }),
        finalize(() => {
          this.isShowUserInfoLoading.set(false);
        })
      )
      .subscribe();
  }

  onDeleteUser(id: number | undefined): void {
    this.isShowUserInfoLoading.set(true);
    this.usersService
      .deleteUser(id!)
      .pipe(tap((res) => {
        this.toastService.success('The User has been deleted successfully');
        this.closeSideModal();
      }),finalize(()=>{
        this.isShowUserInfoLoading.set(false);

      }))
      .subscribe();
  }

  closeUserModal(): void {
    this.showUserModal.set(false);
  }

  handleConfirm():void {
    if(this.modalInfo().type === this.modalType.DELETE){
      this.onDeleteUser(this.selectedUser()?.id);
    }else if (this.modalInfo().type === this.modalType.EDIT){
    }
  }

  closeSideModal():void {
    this.selectedUser.set(null);
    this.isOpenSideModal.set(false);
    this.offcanvasService.dismiss();
  }
  editUser(): void {
    this.showUserModal.set(true);
    this.modalInfo.set({
      type: ModalType.EDIT,
      confirmBtnTxt: 'Save',
      cancelBtnTxt: 'Cancel',
    });

  }
  deleteUser(): void {
    this.showUserModal.set(true);
    this.modalInfo.set({
      type: ModalType.DELETE,
      confirmBtnTxt: 'Yes',
      cancelBtnTxt: 'Cancel',
    });
  }
}

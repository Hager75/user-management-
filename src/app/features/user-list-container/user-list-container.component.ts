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
import { User, UserInfo } from '../../core/models/user.model';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { ModalType } from '../../core/enums/shared.enum';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GeneralModalComponent } from '../../shared/components/general-modal/general-modal.component';
import { SideModalComponent } from '../../shared/components/side-modal/side-modal.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [
    UserListComponent,
    UserListHeaderComponent,
    GeneralModalComponent,
    SideModalComponent,
    AddEditUserComponent,
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
    title:'Delete User'
  });
  showUserModal = signal(false);
  isShowUserLoading = signal(false);
  modalType = ModalType;
  userForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    job: new FormControl<string>('', Validators.required),
  });
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
      .pipe(
        tap((res) => {
          this.toastService.success('The User has been deleted successfully');
          this.closeSideModal();
        }),
        finalize(() => {
          this.isShowUserInfoLoading.set(false);
        })
      )
      .subscribe();
  }

  addUser(user:User): void {
    this.isShowUserLoading.set(true);
    this.usersService
      .addUser(user)
      .pipe(
        tap((res) => {
          this.toastService.success('The User has been Added successfully');
        }),
        finalize(() => {
          this.isShowUserLoading.set(false);
          this.userForm.reset();
        })
      ).subscribe();
  }

  updateUser(user:User): void{
    this.isShowUserLoading.set(true);
    this.usersService
      .updateUser(this.selectedUser()?.id || 1 ,user)
      .pipe(
        tap((res) => {
          this.toastService.success('The User has been updated successfully');
        }),
        finalize(() => {
          this.isShowUserLoading.set(false);
          this.userForm.reset();
          this.closeSideModal();
        })
      ).subscribe();
  }

  closeUserModal(): void {
    this.showUserModal.set(false);
  }

  handleConfirm(): void {
    if (this.modalInfo().type === this.modalType.DELETE) {
      this.onDeleteUser(this.selectedUser()?.id);
    } else if (this.modalInfo().type === this.modalType.EDIT) {
      const userData = this.getUserData();
      this.updateUser(userData);

    } else if (
      this.modalInfo().type === this.modalType.ADD &&
      this.userForm.valid
    ) {
      const userData = this.getUserData();
      this.addUser(userData);
    }
  }
  getUserData(): User {
    const userData: User = {
      name: this.userForm.get('name')?.value ?? '',
      job: this.userForm.get('job')?.value ?? '',
    };
    return userData;
  }

  closeSideModal(): void {
    this.selectedUser.set(null);
    this.isOpenSideModal.set(false);
    this.offcanvasService.dismiss();
  }
  editUser(): void {
    this.showUserModal.set(true);
    this.setUserForm();
    this.modalInfo.set({
      type: ModalType.EDIT,
      confirmBtnTxt: 'Save',
      cancelBtnTxt: 'Cancel',
      title:'Edit User'
    });
  }
  deleteUser(): void {
    this.showUserModal.set(true);
    this.modalInfo.set({
      type: ModalType.DELETE,
      confirmBtnTxt: 'Yes',
      cancelBtnTxt: 'Cancel',
      title:'Delete User'
    });
  }
  openUserModal(): void {
    this.modalInfo.set({
      type: ModalType.ADD,
      confirmBtnTxt: 'Save',
      cancelBtnTxt: 'Cancel',
      title:'Add User'
    });
    this.showUserModal.set(true);
  }
  setUserForm():void{
    this.userForm.setValue({
      name:`${this.selectedUser()?.first_name} ${this.selectedUser()?.last_name}`,
      job: `${this.selectedUser()?.email}` 
    })
  }
}

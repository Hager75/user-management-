import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UserListHeaderComponent } from './user-list-header/user-list-header.component';
import { UsersService } from '../../core/services/users.service';
import { UserInfo } from '../../core/models/user.model';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [UserListComponent,UserListHeaderComponent],
  templateUrl: './user-list-container.component.html',
  styleUrl: './user-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent implements OnInit{
  usersService = inject(UsersService);
  isLoading = signal(false);
  isShowUserInfoLoading = signal(false);
  userList = signal<UserInfo[]>([]);
  selectedUser = signal<UserInfo | null>(null);
  currentPage = 1;
  ngOnInit(): void {
    this.isLoading.set(true);
      this.usersService.getUserList({page:this.currentPage}).pipe(tap(({data}) => {
        this.userList.set(data);
      }), finalize(() => {
        this.isLoading.set(false);
    
      })).subscribe();
  }
  handleUserClick(id:number):void{
    this.isShowUserInfoLoading.set(true);
    this.usersService.getUserInfo(id).pipe(tap(({data}) => {
      this.selectedUser.set(data);
    }), finalize(() => {
      this.isShowUserInfoLoading.set(false);
  
    })).subscribe();
  }
 }

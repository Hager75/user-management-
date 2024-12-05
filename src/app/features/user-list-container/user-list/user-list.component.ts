import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UserInfo } from '../../../core/models/user.model';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent { 
  users = input.required<UserInfo[]>();
  handleUserClick = output<number>();
  userClicked(id:number):void{
    this.handleUserClick.emit(id);
  }
}

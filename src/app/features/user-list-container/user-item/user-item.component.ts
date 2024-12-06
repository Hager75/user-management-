import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { UserInfo } from '../../../core/models/user.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent {
  user = input.required<UserInfo>();
  userClicked = output<number>();
  onUserClicked(id:number):void{
    this.userClicked.emit(id);
  }
 }

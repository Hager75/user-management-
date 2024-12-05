import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [BreadcrumbComponent, ButtonComponent],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListHeaderComponent {
  showAddUserModal = output<void>();
  onAddUser(): void {
    this.showAddUserModal.emit();
  }
}

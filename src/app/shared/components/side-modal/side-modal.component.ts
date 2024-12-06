import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UserInfo } from '../../../core/models/user.model';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './side-modal.component.html',
  styleUrl: './side-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideModalComponent {
  isLoading = input(false);
  selectedUser = input.required<UserInfo | null>();
  isShowModal = input(false);
  contentTemplate = viewChild('content');
  offcanvasService = inject(NgbOffcanvas);
  editUser = output<void>();
  deleteUser = output<void>();
  closeSideModal = output<void>();
  offcanvas = input();
  constructor() {
    effect(() => {
      if (this.isShowModal() === true) {
        this.openSideModal();
      }
    });
  }
  onEdit(): void {
    this.editUser.emit();
  }
  onDelete(): void {
    this.deleteUser.emit();
  }
  openSideModal(): void {
    this.offcanvasService.open(this.contentTemplate(), {
      backdrop: false,
      position: 'end',
    });
  }
  onClose(): void {
    this.closeSideModal.emit();
  }
}

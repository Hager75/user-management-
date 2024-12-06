import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  TemplateRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-general-modal',
  standalone: true,
  imports: [NgbDatepickerModule,ButtonComponent],
  templateUrl: './general-modal.component.html',
  styleUrl: './general-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralModalComponent {
  private modalService = inject(NgbModal);
  isShowModal = input.required();
  confirmBtnTitle = input('Save');
  cancelBtnTitle = input('Cancel');
  contentTemplate = viewChild('content');
  closeModal = output();
  confirm = output();

  constructor() {
    effect(() => {
      if (this.isShowModal() === true) {
        this.open();
      }
    });
  }

  open() {
    this.modalService
      .open(this.contentTemplate(), { ariaLabelledBy: 'modal-basic-title' })
      .result.then();
  }

  onSave(modal:any): void {
    this.confirm.emit();
    this.close(modal);
  }

  close(modal:any):void{
    modal.close();
    this.closeModal.emit();
  }
}

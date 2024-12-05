import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toasts-container.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsContainerComponent {
  toastService = inject(ToastService);
}

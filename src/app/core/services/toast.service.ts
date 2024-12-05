import {Injectable, signal } from '@angular/core';

import { Toast } from '../models/toast.model';
import { ToastType } from '../enums/shared.enum';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  show(text: string, options: Partial<Toast> = {}, toastType:ToastType) {
    this.toasts.update((prev)=>[...prev,{ text, ...options ,toastType}]);
  }

  getToasts(){
    return this.toasts();
  }

  remove(toast: Toast) {
    this.toasts.set(this.toasts().filter(t => t !== toast));
  }

  success(text: string, header?: string) {
    this.show(text, { classname: 'bg-success text-light', header },ToastType.SUCCESS);
  }

  error(text: string, header?: string) {
    this.show(text, { classname: 'bg-danger text-light', header}, ToastType.ERROR);
  }
}

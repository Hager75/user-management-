import { ToastType } from "../enums/shared.enum";

export interface Toast {
    text: string;
    header?: string;
    classname?: string;
    delay?: number;
    toastType: ToastType;
  }
  
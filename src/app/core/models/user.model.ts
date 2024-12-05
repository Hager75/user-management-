import { FormControl } from "@angular/forms";

export interface LoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}

export interface userFormData {
    username: string;
    password: string;
}
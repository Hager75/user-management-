import { FormControl } from "@angular/forms";

export interface LoginForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}

export interface userFormData {
    email: string;
    password: string;
}

export interface loginUserResponse{
    token:string;
}